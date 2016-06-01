
//Create Fluro UI With dependencies
angular.module('fluro.asset', []);
angular.module('fluro.asset')

.service('Asset', function(Fluro, $window) {

    var controller = {}

    /////////////////////////////////////////////////////

    //Retrieve an asset API url
    controller.getUrl = function(id, params) {

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
        if(params.extension && params.extension.length) {
            url += '/file/file.' + params.extension;

            //Dont need to include it anymore
            delete params.extension;
        }

        ////////////////////////////////////////

        //If we haven't requested without token
        if(!params.withoutToken) {

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
        return controller.getUrl(id, {w:50});
    }

    //////////////////////////////////////////////////

    //Helper function for retrieving an image
    controller.imageUrl = function(_id, w, h, params) {

        if (!params) {
            params = {};
        }

        //Create the basic url
        var url = Fluro.apiURL + '/get/' + _id;

        //////////////////////////////////////

        //Setup our usual width limit
        var limitWidth = 1920;

        //If the screen is smaller then 768 use an optimised image
        if ($window.screen.width <= 768) {
            limitWidth = 1536;
        }

        //If using mobile then use a smaller optimised image
        if ($window.screen.width <= 320) {
            limitWidth = 640;
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
       
        //If a file extension was provided append it to the url
        if(params.extension && params.extension.length) {
            url += '/file/file.' + params.extension;

            //Dont need to include it in the query string
            delete params.extension;
        }

        ////////////////////////////////////////

        //If we haven't requested without token
        if(!params.withoutToken) {

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
    controller.downloadUrl = function(id) {

        var url = Fluro.apiURL + '/download/' + id;

        //Append the token if we have one
        if (Fluro.token) {
            url += '?access_token=' + Fluro.token;
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
});