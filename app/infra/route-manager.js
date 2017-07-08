import FS from 'fs';

import express from 'express';

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
                this.retrievelatestGames((err, data) => {
                    if(!err) {
                        const html = this.render(renderProps, data);

                        res.render('index', {
                            content: html,
                            context: data
                        });
                    } else {
                        res.status(500).send();
                    }
                });

            });
        });

        return router;
    },

    createApiRouter(app) {
        const router = express.Router();

        router.get('/latest-games', (req, res) => {
            this.retrievelatestGames((err, content, body) => {
                if(!err && content.statusCode == 200) {
                    parseString(body, function (err, result) {
                        res.send(result.items);
                    });
                } else {
                    res.status(500).send();
                }
            });
        });

        return router;
    },

    retrievelatestGames(callback) {
        request('https://boardgamegeek.com/xmlapi2/hot?boardgame', callback);
    },

    render(renderProps, data) {
        let parsedData = data;
        let html = renderToString(
            <ContextWrapper data={parsedData}>
                <RoutingContext {...renderProps}/>
            </ContextWrapper>
        );
        return html;
    }
});

export default routeManager;
