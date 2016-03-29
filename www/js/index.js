/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function initPushwoosh() {
    var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
 
    //set push notifications handler
    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;
                                 
        if(typeof(userData) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }

        alert(title);
    });
 
    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", pw_appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({ projectid: "633137522062", pw_appid : "5B56F-1EEA2" });
 
    //register for pushes
    pushNotification.registerDevice(
        function(status) {
            var pushToken = status;
            console.warn('push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
}


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        initPushwoosh();
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function getImage(type) {
    // navigator.camera.getPicture(onSuccess, onFail, { 
    //     quality: 50,
    //     destinationType: Camera.DestinationType.DATA_URL,
    //     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
    // });

    if (type == 'Camera') {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    } else {
        navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        });
    }
}

function onSuccess(imageData) {
    $("#home").fadeOut();
    $("#loader").fadeIn();
    select_color_image = 'select_image';

    var image = $('#cameraImg');
    // alert(imageData);
    document.addEventListener("backbutton", backbuttonhomescreenimage, false);
    image.attr('src',"data:image/jpeg;base64," + imageData);
    // image.src = "data:image/jpeg;base64," + imageData;
    // var image = document.getElementById('myImage');
    // image.src = "data:image/jpeg;base64," + imageData;

    // var img = document.getElementById('myImage');
    // var canvas = document.createElement('canvas');
    // canvas.width = image.width;
    // canvas.height = image.height;
    // canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);

    // $('#cameraImg').click(function() {

    // });
    $("#loader").fadeOut();
    $("#select_color").fadeIn();
    $("#cameraImgdiv").css("opacity", "1");
}

function onFail(message) {
    alert('Failed because: ' + message);
}


function backbuttonhomescreenimage(){
    document.addEventListener("backbutton", onBackKeyDown, false);
    $(".main_section").hide();
    $("#home").show();
}
// openFB.init('1474734099449266', '', window.localStorage);

$(function() {
    $('#cameraImg').click(function(e) {
        if(!this.canvas) {
            this.canvas = $('<canvas />')[0];
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
        }
        var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;

        var clr =  'rgba(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] + ',' + pixelData[3]/255 + ')' ;
        $('.imgClrRGBA').css("background-color", clr );
    });
});


