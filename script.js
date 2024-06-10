(function(){
    var script = {
 "scrollBarMargin": 2,
 "class": "Player",
 "layout": "absolute",
 "children": [
  "this.MainViewer",
  "this.Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_0AEF1C12_16A3_8FB1_4188_D5C88CE581C3",
  "this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08",
  "this.Button_EFEC8666_FCFE_6429_41C0_8A9DB4BED3CE",
  "this.Button_ED278805_FCE6_EBEB_41EB_B289487A6569",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "id": "rootPlayer",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.ThumbnailGrid_2F8BA686_0D4F_6B7E_419C_EB65DD1505BB_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "defaultVRPointer": "laser",
 "borderSize": 0,
 "paddingRight": 0,
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "scripts": {
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "unregisterKey": function(key){  delete window[key]; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "registerKey": function(key, value){  window[key] = value; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getKey": function(key){  return window[key]; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "existsKey": function(key){  return key in window; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } }
 },
 "minHeight": 20,
 "horizontalAlign": "left",
 "downloadEnabled": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "propagateClick": false,
 "height": "100%",
 "minWidth": 20,
 "gap": 10,
 "desktopMipmappingEnabled": false,
 "definitions": [{
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -0.83,
  "class": "PanoramaCameraPosition",
  "pitch": -3.03
 },
 "id": "panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -69.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E934C712_FD5E_25E9_41DB_B6A15A6298A0",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6",
   "camera": "this.panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0",
   "camera": "this.panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "popupDistance": 100,
 "popupMaxHeight": "95%",
 "hfov": 7.27,
 "showDuration": 500,
 "id": "popup_E8A18049_FCDA_1C7B_41DE_CC95ECDD7E15",
 "rotationX": 0,
 "rotationZ": 0,
 "hideDuration": 500,
 "hideEasing": "cubic_out",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/popup_E8A18049_FCDA_1C7B_41DE_CC95ECDD7E15_0_1.png",
    "width": 723,
    "class": "ImageResourceLevel",
    "height": 1024
   }
  ]
 },
 "pitch": -2.27,
 "showEasing": "cubic_in",
 "yaw": 40.94,
 "class": "PopupPanoramaOverlay"
},
{
 "id": "ImageResource_E5245A44_FD66_EC68_41E8_928218075566",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_E8A18049_FCDA_1C7B_41DE_CC95ECDD7E15_0_0.png",
   "width": 1414,
   "class": "ImageResourceLevel",
   "height": 2000
  },
  {
   "url": "media/popup_E8A18049_FCDA_1C7B_41DE_CC95ECDD7E15_0_1.png",
   "width": 723,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_E8A18049_FCDA_1C7B_41DE_CC95ECDD7E15_0_2.png",
   "width": 361,
   "class": "ImageResourceLevel",
   "height": 512
  }
 ]
},
{
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 131.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E93ED707_FD5E_25F7_41D0_62D258E70D35",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "hfov": 360,
 "label": "0001",
 "id": "panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6",
 "thumbnailUrl": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0",
   "yaw": -0.07,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 50.14
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_F372B353_FCE6_1C68_416F_AD5B5C0536E4",
  "this.overlay_E8C95EC5_FCEB_E46B_41D0_F97E7AF74095",
  "this.popup_E8A18049_FCDA_1C7B_41DE_CC95ECDD7E15"
 ],
 "partial": false
},
{
 "hfovMin": "150%",
 "hfov": 360,
 "label": "0003",
 "id": "panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8",
 "thumbnailUrl": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0",
   "yaw": 110.16,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -48.56
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_ECC08CB2_FCEA_2428_41D6_6F367FF77EF5"
 ],
 "partial": false
},
{
 "items": [
  {
   "media": "this.panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6",
   "camera": "this.panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2F8BA686_0D4F_6B7E_419C_EB65DD1505BB_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0",
   "camera": "this.panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2F8BA686_0D4F_6B7E_419C_EB65DD1505BB_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8",
   "camera": "this.panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2F8BA686_0D4F_6B7E_419C_EB65DD1505BB_playlist, 2, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailGrid_2F8BA686_0D4F_6B7E_419C_EB65DD1505BB_playlist",
 "class": "PlayList"
},
{
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_camera",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 11
},
{
 "hfovMin": "150%",
 "hfov": 360,
 "label": "0002",
 "id": "panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0",
 "thumbnailUrl": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8",
   "yaw": -48.56,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 110.16
  },
  {
   "panorama": "this.panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6",
   "yaw": 50.14,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -0.07
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_F34F4443_FCEE_2468_41D0_52BCD4836998",
  "this.overlay_EC9BA448_FCEE_2478_41E2_8D69DA6130AA",
  "this.overlay_E8791EAD_FCDE_243B_41D8_1AB0B0B59330"
 ],
 "partial": false
},
{
 "buttonCardboardView": [
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB"
 ],
 "viewerArea": "this.MainViewer",
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "mouseControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer",
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation"
},
{
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": -129.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E9C626FB_FD5E_241F_41D1_53A4D50A68D6",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6",
   "camera": "this.panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0",
   "camera": "this.panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8",
   "camera": "this.panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "initialPosition": {
  "yaw": 179.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E92C371E_FD5E_2419_41E7_1B3CE62F1676",
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 11
},
{
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "MainViewer",
 "left": 0,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipFontFamily": "Georgia",
 "playbackBarProgressOpacity": 1,
 "height": "100%",
 "minWidth": 100,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#000000",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#FFFFFF",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 10,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionDuration": 500,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#000000",
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 13,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 0.5,
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "class": "ViewerArea",
 "data": {
  "name": "Main Viewer"
 }
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
  "this.Container_9A7696F9_9256_4198_41E2_40E7CF09A427",
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA"
 ],
 "id": "Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "backgroundImageUrl": "skin/Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7.png",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "borderRadius": 0,
 "horizontalAlign": "left",
 "minHeight": 1,
 "height": "12.832%",
 "propagateClick": false,
 "bottom": "0%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "--- MENU"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "scrollBarOpacity": 0.5,
 "width": 115.05,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "borderRadius": 0,
 "height": 641,
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "data": {
  "name": "-- SETTINGS"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "id": "Container_0AEF1C12_16A3_8FB1_4188_D5C88CE581C3",
 "left": 30,
 "scrollBarOpacity": 0.5,
 "width": 573,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": 20,
 "borderRadius": 0,
 "height": 116,
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "paddingTop": 0,
 "data": {
  "name": "--STICKER"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.Container_04FF5C2C_1216_7593_41B2_1B5CFADF351D",
  "this.Container_04FF9C2D_1216_75ED_41A8_E3495D8F554E"
 ],
 "id": "Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--INFO"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--PANORAMA LIST"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.Container_1813AA3E_1663_8BF1_41A2_CA5EE3718362",
  "this.Container_1812AA3F_1663_8BEF_41A4_02F566B1BC6D"
 ],
 "id": "Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--LOCATION"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--FLOORPLAN"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--PHOTOALBUM"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.Container_0DEF7FEC_12FA_D293_4197_332CA20EDBCF",
  "this.Container_0DEC1FED_12FA_D26D_41AE_8CE7699C44D8"
 ],
 "id": "Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--CONTACT"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, true, 0, null, null, false)",
 "id": "Button_EFEC8666_FCFE_6429_41C0_8A9DB4BED3CE",
 "left": "0.05%",
 "shadowBlurRadius": 15,
 "width": 336.4,
 "fontFamily": "Netron",
 "paddingRight": 0,
 "borderSize": 0,
 "rollOverShadow": false,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconHeight": 0,
 "shadowSpread": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 46.55,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000"
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "bottom": "9.46%",
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "label": "Virtual TOUR DEMO",
 "fontSize": "25px",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "paddingTop": 0,
 "gap": 5,
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "data": {
  "name": "Button house info"
 },
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 0,
 "cursor": "hand",
 "class": "Button",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, true, 0, null, null, false)",
 "id": "Button_ED278805_FCE6_EBEB_41EB_B289487A6569",
 "left": "0.01%",
 "shadowBlurRadius": 15,
 "width": 286.8,
 "fontFamily": "Netron",
 "paddingRight": 0,
 "borderSize": 0,
 "rollOverShadow": false,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconHeight": 0,
 "shadowSpread": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 54.43,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000"
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "bottom": "14.82%",
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "label": "ENVIDOX ",
 "fontSize": "51px",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "paddingTop": 0,
 "gap": 5,
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "data": {
  "name": "Button house info"
 },
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 0,
 "cursor": "hand",
 "class": "Button",
 "fontWeight": "normal"
},
{
 "class": "UIComponent",
 "id": "veilPopupPanorama",
 "left": 0,
 "right": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.55,
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "minHeight": 0,
 "top": 0,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "bottom": 0,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 0,
 "paddingTop": 0,
 "data": {
  "name": "UIComponent18011"
 },
 "paddingBottom": 0,
 "shadow": false,
 "visible": false,
 "backgroundColorDirection": "vertical"
},
{
 "class": "ZoomImage",
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "right": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "minHeight": 0,
 "top": 0,
 "borderRadius": 0,
 "backgroundColorRatios": [],
 "propagateClick": false,
 "bottom": 0,
 "backgroundColor": [],
 "minWidth": 0,
 "paddingTop": 0,
 "data": {
  "name": "ZoomImage18012"
 },
 "paddingBottom": 0,
 "scaleMode": "custom",
 "shadow": false,
 "visible": false,
 "backgroundColorDirection": "vertical"
},
{
 "fontColor": "#FFFFFF",
 "class": "CloseButton",
 "layout": "horizontal",
 "id": "closeButtonPopupPanorama",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Arial",
 "right": 10,
 "paddingRight": 5,
 "borderSize": 0,
 "paddingLeft": 5,
 "backgroundOpacity": 0.3,
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "iconColor": "#000000",
 "iconHeight": 20,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "top": 10,
 "borderRadius": 0,
 "pressedIconColor": "#888888",
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "minWidth": 0,
 "label": "",
 "gap": 5,
 "iconLineWidth": 5,
 "fontSize": "1.29vmin",
 "paddingTop": 5,
 "fontStyle": "normal",
 "rollOverIconColor": "#666666",
 "paddingBottom": 5,
 "data": {
  "name": "CloseButton18013"
 },
 "textDecoration": "none",
 "backgroundColorDirection": "vertical",
 "iconWidth": 20,
 "visible": false,
 "cursor": "hand",
 "shadow": false,
 "fontWeight": "normal"
},
{
 "maxWidth": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "toggle",
 "propagateClick": false,
 "minWidth": 1,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "maxWidth": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "toggle",
 "propagateClick": false,
 "minWidth": 1,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton MUTE"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.49,
   "image": "this.AnimatedImageResource_F306F607_FCEA_27E8_41E8_0B8D4F43ED4E",
   "pitch": -22.1,
   "yaw": -0.07,
   "distance": 100
  }
 ],
 "id": "overlay_F372B353_FCE6_1C68_416F_AD5B5C0536E4",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 17.49,
   "yaw": -0.07,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -22.1
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0, this.camera_E9C626FB_FD5E_241F_41D1_53A4D50A68D6); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.29,
   "image": "this.AnimatedImageResource_E5365A3E_FD66_EC18_41E3_6FBE22EBEADB",
   "pitch": -2.27,
   "yaw": 40.94,
   "distance": 100
  }
 ],
 "id": "overlay_E8C95EC5_FCEB_E46B_41D0_F97E7AF74095",
 "data": {
  "label": "Info 02"
 },
 "maps": [
  {
   "hfov": 10.29,
   "yaw": 40.94,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.27
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupPanoramaOverlay(this.popup_E8A18049_FCDA_1C7B_41DE_CC95ECDD7E15, {'pressedIconColor':'#888888','pressedBackgroundColorDirection':'vertical','rollOverBackgroundOpacity':0.3,'backgroundColorRatios':[0,0.09803921568627451,1],'iconHeight':20,'rollOverBackgroundColorDirection':'vertical','pressedIconHeight':20,'rollOverIconLineWidth':5,'rollOverIconWidth':20,'rollOverBorderColor':'#000000','pressedBackgroundColorRatios':[0,0.09803921568627451,1],'paddingTop':5,'rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverIconHeight':20,'borderSize':0,'backgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconWidth':20,'paddingRight':5,'pressedBackgroundOpacity':0.3,'paddingLeft':5,'iconWidth':20,'pressedBorderSize':0,'paddingBottom':5,'iconColor':'#000000','iconLineWidth':5,'backgroundColorDirection':'vertical','rollOverBorderSize':0,'rollOverIconColor':'#666666','backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedBorderColor':'#000000','borderColor':'#000000'}, this.ImageResource_E5245A44_FD66_EC68_41E8_928218075566, null, null, null, null, false)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.15,
   "image": "this.AnimatedImageResource_EF3184CD_FCEA_647B_41E8_3CD9A41974EE",
   "pitch": -31.16,
   "yaw": 110.16,
   "distance": 100
  }
 ],
 "id": "overlay_ECC08CB2_FCEA_2428_41D6_6F367FF77EF5",
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 16.15,
   "yaw": 110.16,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -31.16
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0, this.camera_E93ED707_FD5E_25F7_41D0_62D258E70D35); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.15,
   "image": "this.AnimatedImageResource_EF3224CC_FCEA_6479_41CC_2D6A13AB72EF",
   "pitch": -19.77,
   "yaw": 50.14,
   "distance": 50
  }
 ],
 "id": "overlay_F34F4443_FCEE_2468_41D0_52BCD4836998",
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "maps": [
  {
   "hfov": 16.15,
   "yaw": 50.14,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.77
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6, this.camera_E92C371E_FD5E_2419_41E7_1B3CE62F1676); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.12,
   "image": "this.AnimatedImageResource_EF3244CD_FCEA_647B_41D9_41C932EC813F",
   "pitch": -20.04,
   "yaw": -48.56,
   "distance": 50
  }
 ],
 "id": "overlay_EC9BA448_FCEE_2478_41E2_8D69DA6130AA",
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "maps": [
  {
   "hfov": 16.12,
   "yaw": -48.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -20.04
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8, this.camera_E934C712_FD5E_25E9_41DB_B6A15A6298A0); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.82,
   "image": "this.AnimatedImageResource_E5376A3F_FD66_EC18_4181_DE0D5C481246",
   "pitch": -13.53,
   "yaw": 4.77,
   "distance": 100
  }
 ],
 "id": "overlay_E8791EAD_FCDE_243B_41D8_1AB0B0B59330",
 "data": {
  "label": "Info Red 08"
 },
 "maps": [
  {
   "hfov": 12.82,
   "yaw": 4.77,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -13.53
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true
},
{
 "maxWidth": 49,
 "id": "IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
 "maxHeight": 37,
 "width": 49,
 "right": 30,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "height": 37,
 "borderRadius": 0,
 "mode": "push",
 "transparencyActive": true,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA_rollover.png",
 "bottom": 8,
 "minWidth": 1,
 "iconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton VR"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "maxWidth": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "push",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "minWidth": 1,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton VR"
 },
 "paddingBottom": 0,
 "shadow": false,
 "visible": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "maxWidth": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "toggle",
 "propagateClick": false,
 "minWidth": 1,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton GYRO"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "maxWidth": 58,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "toggle",
 "propagateClick": false,
 "minWidth": 1,
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton HS "
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "maxWidth": 3000,
 "id": "Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
 "left": "0%",
 "maxHeight": 2,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_9511127C_9B79_D2C1_41D8_D080B87BFD84.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 2,
 "propagateClick": false,
 "bottom": 53,
 "minWidth": 1,
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "white line"
 },
 "scaleMode": "fit_outside",
 "shadow": false,
 "class": "Image"
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
  "this.Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD"
 ],
 "id": "Container_9A7696F9_9256_4198_41E2_40E7CF09A427",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": 1199,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 30,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 51,
 "minHeight": 1,
 "propagateClick": false,
 "bottom": "0%",
 "minWidth": 1,
 "gap": 3,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "data": {
  "name": "-button set container"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "scrollBarOpacity": 0.5,
 "width": 110,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "top": "0%",
 "borderRadius": 0,
 "height": 110,
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "paddingTop": 0,
 "data": {
  "name": "button menu sup"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "scrollBarOpacity": 0.5,
 "width": "91.304%",
 "right": "0%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": "85.959%",
 "minHeight": 1,
 "propagateClick": false,
 "bottom": "0%",
 "minWidth": 1,
 "gap": 3,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "-button set"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "class": "Container",
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_04FF2C2C_1216_7593_4195_88C3C7049763",
  "this.Container_04FF0C2C_1216_7593_419A_8AC354592A51"
 ],
 "id": "Container_04FF5C2C_1216_7593_41B2_1B5CFADF351D",
 "left": "10%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "right": "10%",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "top": "5%",
 "borderRadius": 0,
 "bottom": "5%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowHorizontalLength": 0
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A"
 ],
 "id": "Container_04FF9C2D_1216_75ED_41A8_E3495D8F554E",
 "left": "10%",
 "scrollBarOpacity": 0.5,
 "right": "10%",
 "paddingRight": 20,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "top": "5%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "bottom": "84.78%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "paddingTop": 20,
 "paddingBottom": 0,
 "data": {
  "name": "Container X global"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "right": "15%",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "top": "7%",
 "borderRadius": 0,
 "bottom": "7%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "vertical",
 "shadowHorizontalLength": 0
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_1813DA3E_1663_8BF1_4193_F28A53801FBC",
  "this.Container_1813FA3E_1663_8BF1_4180_5027A2A87866"
 ],
 "id": "Container_1813AA3E_1663_8BF1_41A2_CA5EE3718362",
 "left": "10%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "right": "10%",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "5%",
 "borderRadius": 0,
 "bottom": "5%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowHorizontalLength": 0
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1"
 ],
 "id": "Container_1812AA3F_1663_8BEF_41A4_02F566B1BC6D",
 "left": "10%",
 "scrollBarOpacity": 0.5,
 "right": "10%",
 "paddingRight": 20,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "top": "5%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "bottom": "80%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "paddingTop": 20,
 "paddingBottom": 0,
 "data": {
  "name": "Container X global"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
  "this.MapViewer",
  "this.ThumbnailGrid_2F8BA686_0D4F_6B7E_419C_EB65DD1505BB"
 ],
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "right": "15%",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "top": "7%",
 "borderRadius": 0,
 "bottom": "7%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "vertical",
 "shadowHorizontalLength": 0
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "right": "15%",
 "paddingRight": 10,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingLeft": 10,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "top": "7%",
 "borderRadius": 0,
 "bottom": "7%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 10,
 "overflow": "visible",
 "paddingBottom": 10,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "vertical",
 "shadowHorizontalLength": 0
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_0DEC9FEC_12FA_D293_41A0_DAD5B350B643",
  "this.Container_0DECBFED_12FA_D26D_41AD_EE1B8CC7BCC8"
 ],
 "id": "Container_0DEF7FEC_12FA_D293_4197_332CA20EDBCF",
 "left": "10%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "right": "10%",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "5%",
 "borderRadius": 0,
 "bottom": "5%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowHorizontalLength": 0
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4"
 ],
 "id": "Container_0DEC1FED_12FA_D26D_41AE_8CE7699C44D8",
 "left": "10%",
 "scrollBarOpacity": 0.5,
 "right": "10%",
 "paddingRight": 20,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "top": "5%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "bottom": "80%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "paddingTop": 20,
 "paddingBottom": 0,
 "data": {
  "name": "Container X global"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "layout": "vertical"
},
{
 "rowCount": 3,
 "colCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_F306F607_FCEA_27E8_41E8_0B8D4F43ED4E",
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameCount": 9
},
{
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_E5365A3E_FD66_EC18_41E3_6FBE22EBEADB",
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F7D96C0D_FCDE_2BFB_41B3_92CF7DFE38B6_0_HS_1_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 3,
 "colCount": 3,
 "frameDuration": 62,
 "id": "AnimatedImageResource_EF3184CD_FCEA_647B_41E8_3CD9A41974EE",
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F72FDC1B_FCDE_E418_41ED_A2C9FB1874E8_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ],
 "frameCount": 9
},
{
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_EF3224CC_FCEA_6479_41CC_2D6A13AB72EF",
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0_HS_3_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_EF3244CD_FCEA_647B_41D9_41C932EC813F",
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0_HS_4_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_E5376A3F_FD66_EC18_4181_DE0D5C481246",
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F7D9730C_FCDE_3DF8_41D7_C550AE3289F0_0_HS_5_0.png",
   "width": 600,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, true, 0, null, null, false)",
 "id": "Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
 "shadowBlurRadius": 15,
 "width": 110,
 "fontFamily": "Metazord Demo",
 "paddingRight": 0,
 "borderSize": 0,
 "rollOverShadow": false,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconHeight": 0,
 "shadowSpread": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 40,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000"
 ],
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "label": "INFO",
 "borderColor": "#000000",
 "fontSize": 12,
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "paddingTop": 0,
 "gap": 5,
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "data": {
  "name": "Button house info"
 },
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 0,
 "cursor": "hand",
 "class": "Button",
 "fontWeight": "bold"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "id": "Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD",
 "shadowBlurRadius": 15,
 "width": 150,
 "fontFamily": "Metazord Demo",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconHeight": 32,
 "shadowSpread": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 40,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "PANORAMAS",
 "borderColor": "#000000",
 "fontSize": 12,
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "paddingTop": 0,
 "gap": 5,
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "data": {
  "name": "Button panorama list"
 },
 "textDecoration": "none",
 "paddingBottom": 0,
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "class": "Button",
 "fontWeight": "bold"
},
{
 "maxWidth": 60,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "maxHeight": 60,
 "width": 60,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 60,
 "transparencyActive": true,
 "mode": "toggle",
 "propagateClick": false,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "minWidth": 1,
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "paddingTop": 0,
 "data": {
  "name": "image button menu"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "maxWidth": 58,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "push",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "minWidth": 1,
 "click": "this.shareTwitter(window.location.href)",
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton TWITTER"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "maxWidth": 58,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "push",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "minWidth": 1,
 "click": "this.shareFacebook(window.location.href)",
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton FB"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77"
 ],
 "id": "Container_04FF2C2C_1216_7593_4195_88C3C7049763",
 "scrollBarOpacity": 0.5,
 "width": "50%",
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundOpacity": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 10,
 "overflow": "scroll",
 "paddingBottom": 10,
 "data": {
  "name": "-left"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.Container_04FF1C2C_1216_7593_417B_D7E74ABC91E3",
  "this.Container_04FFEC2C_1216_7593_41A4_4CD23AB66B04",
  "this.Container_04FF8C2D_1216_75ED_41A5_B4FCB592F167"
 ],
 "id": "Container_04FF0C2C_1216_7593_419A_8AC354592A51",
 "scrollBarOpacity": 0.51,
 "width": "50%",
 "borderSize": 0,
 "paddingRight": 60,
 "paddingLeft": 60,
 "backgroundOpacity": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 400,
 "gap": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "overflow": "visible",
 "paddingBottom": 20,
 "data": {
  "name": "-right"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "vertical"
},
{
 "maxWidth": 60,
 "id": "IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A",
 "maxHeight": 60,
 "width": "25%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": "75%",
 "transparencyActive": false,
 "mode": "push",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A_rollover.jpg",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 90,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "data": {
  "name": "header"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "absolute"
},
{
 "rollOverItemLabelFontColor": "#A2B935",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "class": "ThumbnailGrid",
 "rollOverItemThumbnailShadowColor": "#A2B935",
 "itemMaxHeight": 1000,
 "itemLabelFontFamily": "Times New Roman",
 "width": "100%",
 "horizontalAlign": "center",
 "selectedItemLabelFontColor": "#A2B935",
 "paddingLeft": 70,
 "backgroundOpacity": 0,
 "itemHorizontalAlign": "center",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemBorderRadius": 0,
 "minHeight": 1,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelPosition": "bottom",
 "verticalAlign": "middle",
 "height": "100%",
 "itemThumbnailBorderRadius": 0,
 "itemPaddingLeft": 3,
 "propagateClick": false,
 "minWidth": 1,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemBackgroundColor": [],
 "itemWidth": 220,
 "itemPaddingTop": 3,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "shadow": false,
 "itemThumbnailShadow": false,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemVerticalAlign": "top",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "scrollBarMargin": 2,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemLabelTextDecoration": "none",
 "borderSize": 0,
 "paddingRight": 70,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "scrollBarWidth": 10,
 "itemLabelFontWeight": "bold",
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": 14,
 "selectedItemThumbnailShadow": true,
 "rollOverItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "borderRadius": 5,
 "itemOpacity": 1,
 "itemMinWidth": 50,
 "itemThumbnailHeight": 125,
 "itemBackgroundColorDirection": "vertical",
 "itemHeight": 156,
 "itemLabelFontColor": "#666666",
 "gap": 26,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "scrollBarColor": "#BBD149",
 "itemLabelGap": 7,
 "paddingTop": 10,
 "itemThumbnailWidth": 220,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "ThumbnailList5161"
 },
 "itemLabelFontStyle": "normal",
 "itemMaxWidth": 1000,
 "itemPaddingBottom": 3,
 "scrollBarVisible": "rollOver",
 "itemLabelHorizontalAlign": "center",
 "paddingBottom": 70,
 "itemBackgroundOpacity": 0,
 "itemMode": "normal",
 "itemPaddingRight": 3
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.WebFrame_198A3B12_1666_89B6_41B5_4C2585EFD00E"
 ],
 "id": "Container_1813DA3E_1663_8BF1_4193_F28A53801FBC",
 "scrollBarOpacity": 0.5,
 "width": "70%",
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundOpacity": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 10,
 "overflow": "scroll",
 "paddingBottom": 10,
 "data": {
  "name": "-left"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.Container_18121A3E_1663_8BF1_41B4_AB4C2B45EFFF",
  "this.Container_18120A3E_1663_8BF1_419D_69232EA5FB3D",
  "this.Container_18128A3F_1663_8BEF_41B6_51D1938FA48A"
 ],
 "id": "Container_1813FA3E_1663_8BF1_4180_5027A2A87866",
 "scrollBarOpacity": 0.51,
 "width": "30%",
 "borderSize": 0,
 "paddingRight": 50,
 "paddingLeft": 40,
 "backgroundOpacity": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 350,
 "gap": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "overflow": "visible",
 "paddingBottom": 20,
 "data": {
  "name": "-right"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "vertical"
},
{
 "maxWidth": 60,
 "id": "IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1",
 "maxHeight": 60,
 "width": "25%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": "75%",
 "transparencyActive": false,
 "mode": "push",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1_rollover.jpg",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 90,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "data": {
  "name": "header"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "absolute"
},
{
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "MapViewer",
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "height": "100%",
 "minWidth": 1,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionDuration": 500,
 "progressBorderRadius": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#000000",
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "class": "ViewerArea",
 "data": {
  "name": "Floor Plan"
 }
},
{
 "itemMode": "normal",
 "rollOverItemLabelFontColor": "#04A3E1",
 "id": "ThumbnailGrid_2F8BA686_0D4F_6B7E_419C_EB65DD1505BB",
 "visible": false,
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "itemMaxHeight": 1000,
 "width": "100%",
 "horizontalAlign": "center",
 "itemLabelFontFamily": "Montserrat",
 "selectedItemLabelFontColor": "#04A3E1",
 "paddingLeft": 70,
 "backgroundOpacity": 0.05,
 "itemHorizontalAlign": "center",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemBorderRadius": 0,
 "minHeight": 1,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelPosition": "bottom",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "itemThumbnailBorderRadius": 0,
 "height": "100%",
 "itemPaddingLeft": 3,
 "propagateClick": false,
 "minWidth": 1,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemBackgroundColor": [],
 "itemWidth": 220,
 "itemPaddingTop": 3,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "backgroundColorDirection": "vertical",
 "itemThumbnailShadow": false,
 "shadow": false,
 "itemVerticalAlign": "top",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "scrollBarMargin": 2,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemLabelTextDecoration": "none",
 "borderSize": 0,
 "paddingRight": 70,
 "playList": "this.ThumbnailGrid_2F8BA686_0D4F_6B7E_419C_EB65DD1505BB_playlist",
 "scrollBarWidth": 10,
 "itemLabelFontWeight": "normal",
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": 14,
 "selectedItemThumbnailShadow": true,
 "rollOverItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "borderRadius": 5,
 "itemOpacity": 1,
 "itemMinWidth": 50,
 "itemThumbnailHeight": 125,
 "backgroundColorRatios": [
  0
 ],
 "itemBackgroundColorDirection": "vertical",
 "itemHeight": 156,
 "itemLabelFontColor": "#666666",
 "gap": 26,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 10,
 "itemLabelGap": 7,
 "itemThumbnailWidth": 220,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "ThumbnailList5161"
 },
 "itemLabelFontStyle": "normal",
 "itemMaxWidth": 1000,
 "itemPaddingBottom": 3,
 "scrollBarVisible": "rollOver",
 "itemLabelHorizontalAlign": "center",
 "paddingBottom": 70,
 "itemBackgroundOpacity": 0,
 "class": "ThumbnailGrid",
 "itemPaddingRight": 3
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "data": {
  "name": "Container photo"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270"
 ],
 "id": "Container_0DEC9FEC_12FA_D293_41A0_DAD5B350B643",
 "scrollBarOpacity": 0.5,
 "width": "85%",
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundOpacity": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 10,
 "overflow": "scroll",
 "paddingBottom": 10,
 "data": {
  "name": "-left"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.Container_0DECAFED_12FA_D26D_4191_988031ED4C85",
  "this.Container_0DECDFED_12FA_D26D_41A3_11915FF353DB",
  "this.Container_0DECEFED_12FA_D26D_4184_68D80FD2C88F"
 ],
 "id": "Container_0DECBFED_12FA_D26D_41AD_EE1B8CC7BCC8",
 "scrollBarOpacity": 0.51,
 "width": "50%",
 "borderSize": 0,
 "paddingRight": 50,
 "paddingLeft": 50,
 "backgroundOpacity": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 460,
 "gap": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "overflow": "visible",
 "paddingBottom": 20,
 "data": {
  "name": "-right"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "vertical"
},
{
 "maxWidth": 60,
 "id": "IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4",
 "maxHeight": 60,
 "width": "25%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": "75%",
 "transparencyActive": false,
 "mode": "push",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4_rollover.jpg",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "maxWidth": 2000,
 "id": "Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77.jpg",
 "minHeight": 1,
 "horizontalAlign": "center",
 "top": "0%",
 "borderRadius": 0,
 "verticalAlign": "bottom",
 "height": "100%",
 "propagateClick": false,
 "minWidth": 1,
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "Image40635"
 },
 "scaleMode": "fit_outside",
 "shadow": false,
 "class": "Image"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_04FF1C2C_1216_7593_417B_D7E74ABC91E3",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 0,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.HTMLText_04FFCC2C_1216_7593_41A3_D345BDE131A2",
  "this.Container_0BD17D93_1236_F6B5_4193_247950F46092",
  "this.Container_04FFDC2C_1216_7593_41A7_64E2588509FB"
 ],
 "id": "Container_04FFEC2C_1216_7593_41A4_4CD23AB66B04",
 "scrollBarOpacity": 0.79,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 200,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 100,
 "gap": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Container text"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_04FF8C2D_1216_75ED_41A5_B4FCB592F167",
 "scrollBarOpacity": 0.5,
 "width": 370,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "borderRadius": 0,
 "height": 40,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": "77.115%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 80,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "top": "0%",
 "borderRadius": 0,
 "minHeight": 100,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 1,
 "scrollBarColor": "#000000",
 "paddingTop": 36,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.62vh;font-family:'Otama.ep';\"><B>PANORAMA LIST/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText"
},
{
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "maxHeight": 60,
 "width": "25%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "verticalAlign": "top",
 "borderRadius": 0,
 "mode": "push",
 "height": "75%",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "class": "WebFrame",
 "id": "WebFrame_198A3B12_1666_89B6_41B5_4C2585EFD00E",
 "left": "0%",
 "insetBorder": false,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "scrollEnabled": true,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d426958.695011444!2d39.26460682562743!3d-6.1659828881606344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185d29602a2909e5%3A0xa035af4aad9b7d5f!2zWmFuesOtYmFy!5e0!3m2!1ses!2ses!4v1542269644530\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "minHeight": 1,
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "bottom": "0%",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 1,
 "paddingTop": 0,
 "data": {
  "name": "WebFrame5113"
 },
 "paddingBottom": 0,
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_18121A3E_1663_8BF1_41B4_AB4C2B45EFFF",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 0,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.HTMLText_18123A3E_1663_8BF1_419F_B7BD72D2053B",
  "this.HTMLText_18125A3F_1663_8BEF_4196_AE566E10BAFC",
  "this.Container_18124A3F_1663_8BEF_4167_4F797ED9B565",
  "this.HTMLText_18127A3F_1663_8BEF_4175_B0DF8CE38BFE",
  "this.Button_18126A3F_1663_8BEF_41A4_B0EDA1A5F4E3"
 ],
 "id": "Container_18120A3E_1663_8BF1_419D_69232EA5FB3D",
 "scrollBarOpacity": 0.79,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 520,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 100,
 "gap": 10,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 30,
 "data": {
  "name": "Container text"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_18128A3F_1663_8BEF_41B6_51D1938FA48A",
 "scrollBarOpacity": 0.5,
 "width": 370,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "borderRadius": 0,
 "height": 40,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": "77.115%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 80,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "top": "0%",
 "borderRadius": 0,
 "minHeight": 100,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 1,
 "scrollBarColor": "#000000",
 "paddingTop": 36,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.62vh;font-family:'Otama.ep';\"><B>FLOORPLAN/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText"
},
{
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "maxHeight": 60,
 "width": "25%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "verticalAlign": "top",
 "borderRadius": 0,
 "mode": "push",
 "height": "75%",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton54739"
 },
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "height": "100%",
 "minWidth": 1,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": "0%",
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionDuration": 500,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#000000",
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "class": "ViewerArea",
 "data": {
  "name": "Viewer photoalbum 1"
 }
},
{
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "maxHeight": 60,
 "width": 165,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "minHeight": 50,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "top": "20%",
 "borderRadius": 0,
 "mode": "push",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "bottom": "20%",
 "minWidth": 50,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton27247"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "maxHeight": 60,
 "width": "14%",
 "right": 10,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "minHeight": 50,
 "horizontalAlign": "center",
 "top": "20%",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "mode": "push",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "bottom": "20%",
 "minWidth": 50,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton29918"
 },
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "maxHeight": 60,
 "width": "10%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "verticalAlign": "top",
 "borderRadius": 0,
 "mode": "push",
 "height": "10%",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton54739"
 },
 "shadow": false,
 "cursor": "hand",
 "class": "IconButton"
},
{
 "maxWidth": 2000,
 "id": "Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270.jpg",
 "minHeight": 1,
 "horizontalAlign": "center",
 "top": "0%",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": "100%",
 "propagateClick": false,
 "minWidth": 1,
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "Image"
 },
 "scaleMode": "fit_outside",
 "shadow": false,
 "class": "Image"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_0DECAFED_12FA_D26D_4191_988031ED4C85",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 0,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.HTMLText_30F7AFD1_12F6_52B5_41AC_902D90554335",
  "this.Container_30C72FD2_121E_72B7_4185_0FFA7496FDA6",
  "this.HTMLText_0DECCFED_12FA_D26D_418B_9646D02C4859",
  "this.Button_0DECFFED_12FA_D26D_419B_F907711405D7"
 ],
 "id": "Container_0DECDFED_12FA_D26D_41A3_11915FF353DB",
 "scrollBarOpacity": 0.79,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 520,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 100,
 "gap": 10,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 30,
 "data": {
  "name": "Container text"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_0DECEFED_12FA_D26D_4184_68D80FD2C88F",
 "scrollBarOpacity": 0.5,
 "width": 370,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "borderRadius": 0,
 "height": 40,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_04FFCC2C_1216_7593_41A3_D345BDE131A2",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": "19.129%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "scrollBarColor": "#99BB1B",
 "paddingTop": 0,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.5vh;font-family:'Otama.ep';\">Virtual Tours </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.5vh;font-family:'Otama.ep';\">By Envidox Solutions</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_0BD17D93_1236_F6B5_4193_247950F46092",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 7,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "children": [
  "this.HTMLText_0B1CF751_121B_B3B2_41AA_8DF6E24BB6F1"
 ],
 "id": "Container_04FFDC2C_1216_7593_41A7_64E2588509FB",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "height": "66.515%",
 "minWidth": 1,
 "gap": 22,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "- content"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_18123A3E_1663_8BF1_419F_B7BD72D2053B",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": "13%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "scrollBarColor": "#BBD149",
 "paddingTop": 0,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.08vh;font-family:'Otama.ep';\">HOUSE</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText23803"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_18125A3F_1663_8BEF_4196_AE566E10BAFC",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": "15%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "scrollBarColor": "#BBD149",
 "paddingTop": 0,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.95vh;font-family:'Otama.ep';\"><B>LOCATION</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText24905"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_18124A3F_1663_8BEF_4167_4F797ED9B565",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 7,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_18127A3F_1663_8BEF_4175_B0DF8CE38BFE",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": "100%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "scrollBarColor": "#B3D237",
 "paddingTop": 0,
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#99bb1b;font-size:2.6vh;font-family:'Antonio';\"><B>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. MAECENAS CONGUE EROS MAGNA, ID BIBENDUM EROS MALESUADA VITAE.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.62vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Open Sans Semibold';\"> line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Open Sans Semibold';\"> line 2</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Open Sans Semibold';\"> line 3</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Open Sans Semibold';\">GPS:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Open Sans Semibold';\"> xxxxxxxxxx</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.74vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText"
},
{
 "fontColor": "#FFFFFF",
 "class": "Button",
 "layout": "horizontal",
 "id": "Button_18126A3F_1663_8BEF_41A4_B0EDA1A5F4E3",
 "rollOverBackgroundOpacity": 1,
 "shadowBlurRadius": 6,
 "width": 207,
 "fontFamily": "Antonio",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.7,
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconHeight": 32,
 "shadowSpread": 1,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "height": 59,
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "backgroundColor": [
  "#99BB1B"
 ],
 "minWidth": 1,
 "label": "BOOK NOW",
 "gap": 5,
 "fontSize": 30,
 "paddingTop": 0,
 "click": "this.openLink('http://www.loremipsum.com', '_blank')",
 "fontStyle": "normal",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "data": {
  "name": "Button31015"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "backgroundColorDirection": "vertical",
 "iconWidth": 32,
 "visible": false,
 "cursor": "hand",
 "shadow": false,
 "fontWeight": "bold"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_30F7AFD1_12F6_52B5_41AC_902D90554335",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": "52%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "scrollBarColor": "#BBD149",
 "paddingTop": 0,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.08vh;font-family:'Otama.ep';\">CONTACT</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:11vh;font-family:'Otama.ep';\"><B>INFO</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText24905"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_30C72FD2_121E_72B7_4185_0FFA7496FDA6",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 7,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "black line"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_0DECCFED_12FA_D26D_418B_9646D02C4859",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": "100%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "scrollBarColor": "#B3D237",
 "paddingTop": 0,
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#99bb1b;font-size:3.62vh;font-family:'Antonio';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Open Sans Semibold';\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#99bb1b;font-size:3.62vh;font-family:'Antonio';\"><B>CONTACT:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Open Sans Semibold';\">E-mail:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Open Sans Semibold';\"> Info@loremipsum.com </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Open Sans Semibold';\">Web: </SPAN><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Open Sans Semibold';\">www.loremipsum.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Open Sans Semibold';\">Tlf.:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Open Sans Semibold';\"> +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Open Sans Semibold';\"> line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Open Sans Semibold';\">Address line 2</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText"
},
{
 "fontColor": "#FFFFFF",
 "class": "Button",
 "layout": "horizontal",
 "id": "Button_0DECFFED_12FA_D26D_419B_F907711405D7",
 "rollOverBackgroundOpacity": 1,
 "shadowBlurRadius": 6,
 "width": 207,
 "fontFamily": "Antonio",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.7,
 "pressedBackgroundColorRatios": [
  0
 ],
 "iconHeight": 32,
 "shadowSpread": 1,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "height": 59,
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "backgroundColor": [
  "#99BB1B"
 ],
 "minWidth": 1,
 "label": "BOOK NOW",
 "gap": 5,
 "fontSize": "3.26vh",
 "paddingTop": 0,
 "click": "this.openLink('http://www.loremipsum.com', '_blank')",
 "fontStyle": "normal",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "data": {
  "name": "Button book now"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "backgroundColorDirection": "vertical",
 "iconWidth": 32,
 "cursor": "hand",
 "shadow": false,
 "fontWeight": "bold"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_0B1CF751_121B_B3B2_41AA_8DF6E24BB6F1",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": "47.574%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "scrollBarColor": "#99BB1B",
 "paddingTop": 20,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#000099;font-size:2.75vh;font-family:'Antonio';\"><B>Create Stuning Virtual Tours With Envidox.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.74vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Open Sans Semibold';\">Exhibit your Place with more immersive and Creative Way with Envidox Solution's Virtual Tour. Envidox Solutions Are one of the pioneering Provider of 360 Virtual Tours in web based AR/VR application development Company. We Craft Immersive and Interactive Tailored Virtual Tours and WebXR application that helps your user to Understand and Explore more </SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText12940"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "class": "HTMLText"
}],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "backgroundPreloadEnabled": true,
 "paddingBottom": 0,
 "data": {
  "name": "Player468"
 },
 "mobileMipmappingEnabled": false,
 "scrollBarVisible": "rollOver",
 "mouseWheelEnabled": true,
 "shadow": false,
 "vrPolyfillScale": 0.5
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
