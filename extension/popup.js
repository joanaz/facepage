// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
$(document).ready(function() {
  $('body').on('click', 'a', function() {
    chrome.tabs.create({
      url: $(this).attr('href')
    });
    return false;
  });
});

function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // var contentResult = document.getElementById('news-content');
    // contentResult.innerHTML = url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getImageUrl(searchTerm, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q=' + encodeURIComponent(searchTerm);
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    if (!response || !response.responseData || !response.responseData.results ||
      response.responseData.results.length === 0) {
      errorCallback('No response from Google Image search!');
      return;
    }
    var firstResult = response.responseData.results[0];
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    var imageUrl = firstResult.tbUrl;
    var width = parseInt(firstResult.tbWidth);
    var height = parseInt(firstResult.tbHeight);
    console.assert(
      typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
      'Unexpected respose from the Google Image Search API!');
    callback(imageUrl, width, height);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function getNewsEntities(url, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  // var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + encodeURIComponent(searchTerm);
  var searchUrl = 'http://gateway-a.watsonplatform.net/calls/url/URLGetRankedNamedEntities?apikey=651262c3cad31764da82a5acf6db0766acb90633&outputMode=json&url=' + url;
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    // var response = x.response;
    // if (!response || !response.responseData || !response.responseData.results ||
    //   response.responseData.results.length === 0) {
    //   errorCallback('No response from Google Image search!');
    //   return;
    // }
    // console.log("hello" + response)

    // var contentResult = document.getElementById('news-content');
    // contentResult.innerHTML = response.entities[0];


    var entities = x.response.entities;

    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    // var title = firstResult.text;
    // var resultUrl = firstResult.url;
    // var content = firstResult.relevance
    // var width = parseInt(firstResult.tbWidth);
    // var height = parseInt(firstResult.tbHeight);
    console.assert(
      typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
      'Unexpected respose from the Google Image Search API!');
    // console.log(firstResult)
    callback(entities);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function getNewsConcepts(url, callback, errorCallback) {
  var searchUrl = 'http://gateway-a.watsonplatform.net/calls/url/URLGetRankedConcepts?apikey=651262c3cad31764da82a5acf6db0766acb90633&outputMode=json&url=' + url;
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  x.responseType = 'json';
  x.onload = function() {
    var concepts = x.response.concepts;
    callback(concepts);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function postHistory(url, entities, concepts, callback, errorCallback) {
  var today = new Date();
  var postHistoryUrl = 'http://localhost:8000/api/history/';
  var x = new XMLHttpRequest();
  x.open('POST', postHistoryUrl);
  x.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  // x.responseType = 'json';
  x.onload = function() {
    var response = x.response;
    callback(response);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send(JSON.stringify({
    "url": url,
    "date": today,
    "entities": entities,
    "concepts": concepts
  }));
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    // Put the image URL in Google search.
    // renderStatus('Performing Google Image search for ' + url);
    // renderStatus('Performing entity extraction');
    // document.getElementById('url').textContent = "url: " + url;

    var searchTerm = ""

    getNewsEntities(url, function(entities) {
        // renderStatus('');

        var titleResult = document.getElementById('entity1');
        // Explicitly set the width/height to minimize the number of reflows. For
        // a single image, this does not matter, but if you're going to embed
        // multiple external images in your page, then the absence of width/height
        // attributes causes the popup to resize multiple times.
        titleResult.innerHTML = entities[0].text;
        // var urlResult = document.getElementById('news-url');

        // urlResult.innerHTML = resultUrl
        var contentResult = document.getElementById('relevance1');
        contentResult.innerHTML = entities[0].relevance;

        searchTerm = entities[0].text;


        document.getElementById('entity2').innerHTML = entities[1].text
        document.getElementById('relevance2').innerHTML = entities[1].relevance;
        document.getElementById('entity3').innerHTML = entities[2].text
        document.getElementById('relevance3').innerHTML = entities[2].relevance;
        document.getElementById('entity4').innerHTML = entities[3].text
        document.getElementById('relevance4').innerHTML = entities[3].relevance;
        document.getElementById('entity5').innerHTML = entities[4].text
        document.getElementById('relevance5').innerHTML = entities[4].relevance;


        getNewsConcepts(url, function(concepts) {
            document.getElementById('concept1').innerHTML = concepts[0].text;
            document.getElementById('crelevance1').innerHTML = concepts[0].relevance;
            document.getElementById('concept2').innerHTML = concepts[1].text
            document.getElementById('crelevance2').innerHTML = concepts[1].relevance;
            document.getElementById('concept3').innerHTML = concepts[2].text
            document.getElementById('crelevance3').innerHTML = concepts[2].relevance;
            document.getElementById('concept4').innerHTML = concepts[3].text
            document.getElementById('crelevance4').innerHTML = concepts[3].relevance;
            document.getElementById('concept5').innerHTML = concepts[4].text
            document.getElementById('crelevance5').innerHTML = concepts[4].relevance;


            document.getElementById('addButton').onclick = function() {
              entities = entities.slice(0, 5).map(function(elem) {
                return elem.text
              })
              concepts = concepts.slice(0, 5).map(function(elem) {
                return elem.text
              })
              postHistory(url, entities, concepts, function(response) {
                // renderStatus('Sent.\n ' + response);
              }, function(errorMessage) {
                renderStatus('Button Error: ' + errorMessage);
              });
            }
          },
          function(errorMessage) {
            renderStatus('Error: ' + errorMessage);
          });



        // getImageUrl(searchTerm, function(imageUrl, width, height) {
        //   renderStatus(searchTerm);
        //   // renderStatus('Search term: ' + searchTerm + '\n' +
        //   // 'Google image search result: ' + imageUrl);
        //   var imageResult = document.getElementById('image-result');
        //   // Explicitly set the width/height to minimize the number of reflows. For
        //   // a single image, this does not matter, but if you're going to embed
        //   // multiple external images in your page, then the absence of width/height
        //   // attributes causes the popup to resize multiple times.
        //   imageResult.width = width;
        //   imageResult.height = height;
        //   imageResult.src = imageUrl;
        //   imageResult.hidden = false;

        // }, function(errorMessage) {
        //   renderStatus('Cannot display image. ' + errorMessage);
        // });
        // 


      },
      function(errorMessage) {
        renderStatus('Error: ' + errorMessage);
      });
  });
});