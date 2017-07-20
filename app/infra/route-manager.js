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

const htmlparser = require("htmlparser2");

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
            let images = [];

            this.retrieveDetailedGame((err, content, body) => {
                if(!err && content.statusCode == 200) {
                    parseString(body, (err, result) => {
                        console.log('game title: ', result.boardgames.boardgame[0].name[1]._)
                        this.retrieveImage((err, content, body) => {
                            if(!err && content.statusCode == 200) {
                                let parser = new htmlparser.Parser({
                                    onopentag: function(name, attribs){
                                        if(name === "img" && attribs.src.startsWith("https://encrypted")){
                                          console.log("Img! Hooray!", attribs.src, attribs);
                                          images.push(attribs.src);
                                        }
                                      }
                                  }, {decodeEntities: true});
                                parser.write(body);
                                parser.end();
                                console.log('found image: ', images[0])
                                // console.log('result: ', body)
                                res.send(result.boardgames.boardgame[0]);
                            }
                        }, result.boardgames.boardgame[0].name[1]._);
                    });
                } else {
                    res.status(500).send(err);
                }
            }, id);
        });
    },

    retrieveDetailedGame(callback, id) {
        request('https://boardgamegeek.com/xmlapi/boardgame/' + id, callback);
    },

    retrieveImage(callback, name) {
        request('https://www.google.com/search?site=imghp&q=' + name, callback);
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
