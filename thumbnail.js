// const jsmediatags = window.jsmediatags;
let audio = new Audio("/song/Anuv Jain - HUSN (Official Video)(MP3_160K).mp3")
// audio.play(); 
// console.log(audio);
// var fl= new FileList("Anuv Jain - HUSN (Official Video)(MP3_160K).mp3")
// fl.readDir("song");
// console.log(fl);


// audio.addEventListener
document.querySelector("#input").addEventListener("change", (event) => {
    const file = event.target.files[0];
    console.log("file");
    console.log(file);

    jsmediatags.read(file, {
        onSuccess: function (tag) {
            console.log(tag);
            const data = tag.tags.picture.data;
            const format = tag.tags.picture.format;
            let base64String = "";
            for (let index = 0; index < data.length; index++) {
                base64String += String.fromCharCode(data[index]);

            }

            document.querySelector("#cover").style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`;
            console.log(`url(data:${format};base64,${window.btoa(base64String)})`)
            let coverimg=document.querySelector("#coverimg");
            console.log(coverimg);
            coverimg.src="https://upload.wikimedia.org/wikipedia/en/3/3e/Powfu_-_Death_Bed.png";
            // coverimg.src=`data:${format};base64,${window.btoa(base64String)}`;
            

            document.querySelector("#title").textContent = tag.tags.title;
            document.querySelector("#artist").textContent = tag.tags.artist;
            document.querySelector("#album").textContent = tag.tags.album;
            document.querySelector("#genre").textContent = tag.tags.genre;
        },
        onerror: function (error) {
            console.log(error);
        }
    })
})









// Include jsmediatags library in your HTML
// 

// function getAudioThumbnail(audioPath, imageElement) {
//   jsmediatags.read(audioPath, {
//     onSuccess: function(tag) {
//       const tags = tag.tags;
//       const image = tags.picture;
//       if (image) {
//         let base64String = "";
//         for (let i = 0; i < image.data.length; i++) {
//           base64String += String.fromCharCode(image.data[i]);
//         }
//         const base64 = "data:image/jpeg;base64," + window.btoa(base64String);
//         imageElement.src = base64;
//       } else {
//         imageElement.style.display = "none";
//       }
//     },
//     onError: function(error) {
//       console.error("Error reading audio metadata:", error);
//       imageElement.style.display = "none";
//     }
//   });
// }

// // Example usage
// const audioPath = "Anuv Jain - HUSN (Official Video)(MP3_160K).mp3"; // Replace with actual path
// const thumbnailImage = document.getElementById("cover"); // Replace with your image element ID
// getAudioThumbnail(audioPath, thumbnailImage);


