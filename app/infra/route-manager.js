import express from 'express';
import axios from 'axios';
import nconf from 'nconf';

import React from 'react'
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';

import baseManager from './base-manager';
import routes from '../routes';

const request = require('request');
const parseString = require('xml2js').parseString;

import ContextWrapper from '../components/common/ContextWrapper';

const routeManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app) {
        const apiRouter = this.createApiRouter();
        const pagesRouter = this.createPageRouter();
        app.use('/api', apiRouter);
        app.use('/', pagesRouter);
    },

    createPageRouter() {
        const router = express.Router();

        router.get('*', (req, res) => {
            match({routes, location: req.originalUrl}, (err, redirectLocation, renderProps) => {
                const {promises, components} = this.mapComponentsToPromises(
                    renderProps.components, renderProps.params);

                Promise.all(promises).then((values) => {
                    const data = this.prepareData(values, components);
                    const html = this.render(renderProps, data);

                    res.render('index', {
                        content: html,
                        context: JSON.stringify(data)
                    });
                }).catch((err) => {
                    res.status(500).send(err);
                });
            });
        });
        return router;
    },

    mapComponentsToPromises(components, params) {
        const filteredComponents = components.filter((Component) => {
            return (typeof Component.requestData === 'function');
        });

        const promises = filteredComponents.map(function(Component) {
            return Component.requestData(params, nconf.get('domain'));
        });

        return {promises, components: filteredComponents};
    },

    prepareData(values, components) {
        const map = {};

        values.forEach((value, index) => {
            map[components[0].NAME] = value.data;
        });

        return map;
    },

    createApiRouter(app) {
        const router = express.Router();

        this.createLastestGamesRoute(router);
        this.createDetailedGameRoute(router);
        return router;
    },

    createLastestGamesRoute(router) {
        router.get('/latest-games', (req, res) => {
            this.retrieveLatestGames((err, content, body) => {
                if(!err && content.statusCode == 200) {
                    parseString(body, function (err, result) {
                        res.send(result.items);
                    });
                } else {
                    res.status(500).send();
                }
            });
        });
    },

    retrieveLatestGames(callback) {
        request('https://boardgamegeek.com/xmlapi2/hot?boardgame', callback);
    },

    createDetailedGameRoute(router) {
        router.get('/game/:id', (req, res) => {
            const id = req.params.id;

            this.retrieveDetailedGame((err, content, body) => {
                if(!err && content.statusCode == 200) {
                    parseString(body, function (err, result) {
                        res.send(result.items);
                    });
                } else {
                    res.status(500).send(err);
                }
            });
        });
    },

    retrieveDetailedGame(callback, data) {
        request('https://boardgamegeek.com/xmlapi2/boardgame/' + data.id, callback);
    },

    render(renderProps, data) {
        let html = renderToString(
            <ContextWrapper data={data}>
                <RoutingContext {...renderProps}/>
            </ContextWrapper>
        );
        return html;
    }
});

export default routeManager;
