
//Create Fluro UI With dependencies
angular.module('fluro.asset', []);
angular.module('fluro.asset')

.service('Asset', ['Fluro', '$window', '$http', function(Fluro, $window, $http) {

    var controller = {}

    /////////////////////////////////////////////////////

    //Retrieve an asset API url
    controller.getUrl = function(id, params) {

        if (!id) {
            return;
        }

        var extension;

        ////////////////////////////////////

        //If params is provided as a string assume its a filepath extension
        if (params && _.isString(params)) {
            extension = params;
        }

        ////////////////////////////////////

        //Create a parameters object
        if (!params) {
            params = {};
        }

        ////////////////////////////////////


        //Start with the basic url
        var url = Fluro.apiURL + '/get/' + id;

        ////////////////////////////////////

        //Quick patch for now
        if (extension) {
            params.extension = extension;
        }

        ////////////////////////////////////

        //If an extension was provided add it to the url
        if (params.extension && params.extension.length) {

            if(params.title && params.title.length) {
                url += '/file/' + params.title + '.' + params.extension;
                delete params.title;
            } else {
                if (params.filename && params.filename.length) {
                    url += '/file/' + params.filename + '.' + params.extension;
                    delete params.filename;
                } else {
                    url += '/file/file.' + params.extension;
                }
            }
            

            //Dont need to include it anymore
            delete params.extension;
        } else {
            if (params.filename && params.filename.length) {
                url += '/file/' + params.filename;
                delete params.filename;
            }
        }

        ////////////////////////////////////////

        //If we haven't requested without token
        if (!params.withoutToken) {

            //Check to see if we have a token and none has been explicity set
            if (!params['access_token'] && Fluro.token) {
                params['access_token'] = Fluro.token;
            }
        }

        ////////////////////////////////////////

        //Map each parameter as a query string variable
        var queryParams = _.map(params, function(v, k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }).join('&');

        //If there are query string parameters append them to the url
        if (queryParams.length) {
            url += '?' + queryParams;
        }

        return url;
    }

    /////////////////////////////////////////////////////

    //Deprecated function for retrieving a 50px thumbnail
    controller.thumbnailUrl = function(id) {
        return controller.getUrl(id, {
            w: 50
        });
    }

    //////////////////////////////////////////////////

    //Check if retina screen
    var isRetina = window.devicePixelRatio > 1;

    //////////////////////////////////////////////////

    //Helper function for retrieving the poster image for a video
    controller.posterUrl = function(_id, w, h, params) {
        if (!_id) {
            return;
        }

        if (!params) {
            params = {}
        }


        //////////////////////////////////////

        //Setup our usual width limit
        var limitWidth;

        //By default, limit the width
        if (isRetina) {
            limitWidth = 1920;
        } else {
            limitWidth = 1200;
        }

        //////////////////////////////////////

        //If the screen is smaller then 768 use an optimised image
        if ($window.screen.width <= 768) {
            if (isRetina) {
                limitWidth = 1536;
            } else {
                limitWidth = 768;
            }
        }

        //If using mobile then use a smaller optimised image
        if ($window.screen.width <= 320) {
            if (isRetina) {
                limitWidth = 640;
            } else {
                limitWidth = 320;
            }
        }

        //////////////////////////////////////////////////

        //If no width or height was specified
        if (!w && !h) {
            //Use our default width based on screen size
            params['w'] = limitWidth;
            params['h'] = Math.round(limitWidth * (9 /16));
        } else {

            //If a width was specified
            if (w) {
                params['w'] = w;

                if(!h) {
                    //If no height specified calculate based on aspect ratio
                    params['h'] = Math.round(w * (9 /16));
                }
            }

            //If a height was specified
            if (h) {
                params['h'] = h;
            }
        }
        
        //////////////////////////////////////////////////
        ////////////////////////////////////////

        //If we haven't requested without token
        if (!params.withoutToken) {

            //Check to see if we have a token and none has been explicity set
            if (!params['access_token'] && Fluro.token) {
                params['access_token'] = Fluro.token;
            }
        }


        //////////////////////////////////////////////////


        //Create the basic url
        var url = Fluro.apiURL + '/get/' + _id + '/poster';


        ////////////////////////////////////

        //If an extension was provided add it to the url
        if (params.extension && params.extension.length) {

            if(params.title && params.title.length) {
                url += '/file/' + params.title + '.' + params.extension;
                delete params.title;
            } else {
                if (params.filename && params.filename.length) {
                    url += '/file/' + params.filename + '.' + params.extension;
                    delete params.filename;
                } else {
                    url += '/file/file.' + params.extension;
                }
            }
            

            //Dont need to include it anymore
            delete params.extension;
        } else {
            if (params.filename && params.filename.length) {
                url += '/file/' + params.filename;
                delete params.filename;
            }
        }

        //////////////////////////////////////////////////

        //Remap all the extra parameters as query string variables
        var queryParams = _.map(params, function(v, k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }).join('&');


        //Add the question mark if there are variables
        if (queryParams.length) {
            url += '?' + queryParams;
        }

        return url;
    }

    //////////////////////////////////////////////////

    //Helper function for retrieving an image
    controller.imageUrl = function(_id, w, h, params) {

        if (!_id) {
            return;
        }

        if (!params) {
            params = {};
        }

        //Create the basic url
        var url = Fluro.apiURL + '/get/' + _id;

        //////////////////////////////////////

        //Setup our usual width limit
        var limitWidth;

        //By default, limit the width
        if (isRetina) {
            limitWidth = 1920;
        } else {
            limitWidth = 1200;
        }

        //////////////////////////////////////

        //If the screen is smaller then 768 use an optimised image
        if ($window.screen.width <= 768) {
            if (isRetina) {
                limitWidth = 1536;
            } else {
                limitWidth = 768;
            }
        }

        //If using mobile then use a smaller optimised image
        if ($window.screen.width <= 320) {
            if (isRetina) {
                limitWidth = 640;
            } else {
                limitWidth = 320;
            }
        }

        ////////////////////////////////////

        //If no width or height was specified
        if (!w && !h) {
            //Use our default limits
            params['w'] = limitWidth;
        } else {

            //If a width was specified
            if (w) {
                params['w'] = w;
            }

            //If a height was specified
            if (h) {
                params['h'] = h;
            }
        }


        ////////////////////////////////////

        //If an extension was provided add it to the url
        if (params.extension && params.extension.length) {

            if(params.title && params.title.length) {
                url += '/file/' + params.title + '.' + params.extension;
                delete params.title;
            } else {
                if (params.filename && params.filename.length) {
                    url += '/file/' + params.filename + '.' + params.extension;
                    delete params.filename;
                } else {
                    url += '/file/file.' + params.extension;
                }
            }
            

            //Dont need to include it anymore
            delete params.extension;
        } else {
            if (params.filename && params.filename.length) {
                url += '/file/' + params.filename;
                delete params.filename;
            }
        }

        ////////////////////////////////////////

        //If we haven't requested without token
        if (!params.withoutToken) {

            //Check to see if we have a token and none has been explicity set
            if (!params['access_token'] && Fluro.token) {
                params['access_token'] = Fluro.token;
            }
        }

        ////////////////////////////////////////

        //Default to 90% quality huge compression gains
        if (!params.quality) {
            params.quality = 90;
        }

        ////////////////////////////////////////

        //Remap all the extra parameters as query string variables
        var queryParams = _.map(params, function(v, k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }).join('&');


        //Add the question mark if there are variables
        if (queryParams.length) {
            url += '?' + queryParams;
        }



        return url;

    }


    /////////////////////////////////////////////////////

    //Create a straight forced download url
    controller.downloadUrl = function(id, params) {

        if (!id) {
            return;
        }

        if (!params) {
            params = {};
        }


        var url = Fluro.apiURL + '/download/' + id;


        ////////////////////////////////////

        //If a file extension was provided append it to the url
        if (params.extension && params.extension.length) {

            if (params.filename && params.filename.length) {
                url += '/file/' + params.filename + '.' + params.extension;
                delete params.filename;
            } else {
                url += '/file/file.' + params.extension;
            }

            //Dont need to include it in the query string
            delete params.extension;
        }

        ////////////////////////////////////////

        //If we haven't requested without token
        if (!params.withoutToken) {

            //Check to see if we have a token and none has been explicity set
            if (!params['access_token'] && Fluro.token) {
                params['access_token'] = Fluro.token;
            }
        }


        ////////////////////////////////////////

        //Remap all the extra parameters as query string variables
        var queryParams = _.map(params, function(v, k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }).join('&');


        //Add the question mark if there are variables
        if (queryParams.length) {
            url += '?' + queryParams;
        }



        return url;

    }


    /////////////////////////////////////////////////////

    //Create a straight forced download url
    controller.avatarUrl = function(id, style, params) {

        if (!params) {
            params = {};
        }

        //////////////////////////////////

        if (!style) {
            style = 'user';
        }
        var url = Fluro.apiURL + '/get/avatar/' + style + '/' + id;

        //Append the token if we have one
        if (Fluro.token) {
            params['access_token'] = Fluro.token;
            // url += '?access_token=' + Fluro.token;
        }

        ////////////////////////////////////////

        //Remap all the extra parameters as query string variables
        var queryParams = _.map(params, function(v, k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }).join('&');


        //Add the question mark if there are variables
        if (queryParams.length) {
            url += '?' + queryParams;
        }

        return url;

    }



    /////////////////////////////////////////////////////

    //Get the cover photo for an event if available
    controller.coverPhoto = function(id, style, params) {

        if (!params) {
            params = {};
        }

        if(!style || !style.length) {
            style = 'event';
        }

        //////////////////////////////////
        var url = Fluro.apiURL + '/get/'+style+'/' + id;

        //Append the token if we have one
        if (Fluro.token) {
            params['access_token'] = Fluro.token;
        }

        ////////////////////////////////////////

        //Remap all the extra parameters as query string variables
        var queryParams = _.map(params, function(v, k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }).join('&');


        //Add the question mark if there are variables
        if (queryParams.length) {
            url += '?' + queryParams;
        }

        return url;

    }





    /////////////////////////////////////////////////////

    //Helper function to check if an object is a type of asset
    controller.isAssetType = function(object) {

        switch (object._type) {
            case 'asset':
            case 'video':
            case 'audio':
            case 'image':
                return true;
                break;
            default:
                return false;
                break;
        }
    }

    /////////////////////////////////////////////////////

    return controller;
}]);