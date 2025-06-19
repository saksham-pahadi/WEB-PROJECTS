// let songs=[];
// let folder='songs';

// async function getSongs2() {
//   const apiUrl = `https://api.github.com/repos/saksham-pahadi/Web-development-series/contents/Tut%2084%20Spotify%20clone%20using%20HTML%2C%20CSS%20%26%20javascript/songs`; 
  
//   try {
//     const response = await fetch(apiUrl); 
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const files = await response.json();

//     const songs = files
//       .filter(file => file.name.endsWith(".mp3"))   
//       .map(file => ({
//         name: file.name,
//         url: file.download_url
//       }));

//     console.log("Fetched songs:");
//     // console.log(songs);
//     return songs;

//   } catch (error) {
//     console.error("Error fetching songs:", error);
//   }
// }

// async function getSongArray(){

// songsUrls= await getSongs2();
//   console.log("songs in song array:")
//   // console.log(songs)
//   let URL=[];
//   //  URL=songs[1].url;
//   for (let index = 0; index < songsUrls.length; index++) {
//     URL.push(songsUrls[index].url)
    
//   }
//   console.log("URL")
//   // console.log(URL)

//   let AURL=[];
//   for (let index = 0; index < URL.length; index++) {
//     AURL.push(`https://github.com/saksham-pahadi/Web-development-series/blob/main/Tut%2084%20Spotify%20clone%20using%20HTML%2C%20CSS%20%26%20javascript/${folder}/${URL[index].split(`/${folder}/`)[1]}?raw=true`)
    
//   }


  
  
//   console.log("AURL");
//   // console.log(AURL);
//   return AURL;
// }


// (async function main(){
//   // songs= await getSongs();
//   // console.log(songs)
//   // // let URL=songs[1].url;
//   // let URL=[];
//   // for (let index = 0; index < songs.length; index++) {
//   //   URL.push(songs[index].url)
    
//   // }
//   // console.log(URL)

//   // let AURL=[];
//   // for (let index = 0; index < URL.length; index++) {
//   //   AURL.push(`https://github.com/saksham-pahadi/Web-development-series/blob/main/Tut%2084%20Spotify%20clone%20using%20HTML%2C%20CSS%20%26%20javascript/songs/${URL[index].split("/songs/")[1]}?raw=true`)
    
//   // }




let audio=new Audio("https://github.com/saksham-pahadi/Web-development-series/blob/main/Tut%2084%20Spotify%20clone%20using%20HTML%2C%20CSS%20%26%20javascript/trendingsongs/Choo%20Lo%20-%20The%20Local%20Train.mp3");
audio.play();   

  
  
//   console.log(await getSongArray()); 
//   folder='trendingsongs'
//   console.log(await getSongArray()); 

//     // const audio = new Audio(AURL[5]);      
//     // const timeDisplay = document.getElementById('currentTime');     
//     // audio.play();         
//     // console.log("Audio:"+audio); 
    

// })();








// const URL="https://github.com/saksham-pahadi/Web-development-series/tree/main/Tut%2084%20Spotify%20clone%20using%20HTML%2C%20CSS%20%26%20javascript/trendingsongs";

// console.log(fetch(URL));


