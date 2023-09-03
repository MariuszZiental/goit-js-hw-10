import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_tHnK3cijMbplCbl2Iknz6otGDLthJawXJlOY2JalCV2rkOgId4pJbY1Kz1otxil2';

const url = "https://api.thecatapi.com/v1/images/0XYvRd7oD";
const api_key = "DEMO_API_KEY"
    let storedBreeds = []
        
fetch(url, {
    headers: {
        'x-api-key':api_key
    }
}).then((response) => {
    return response.json();
}).then((data) => {
    data = data, filter(img =>
        img.image?.url != null)
    storedBreeds = data;

    for (let i = 0; i < storedBreeds.length; i++) {
        const breed = storedBreeds[i];
        let option =
            document.createElement('option');
        if (!breed.image) continue
        option.value = i;
        option.innerHTML = '${breed.name}';
        document.getElementById('${breed_selector}').append
    }
    showBreedImage(0)
})    
.catch (function(error) {
    console.log(error);
});

// function showBreedImage(index) {
//     document.getElementById("breed_image").src =
//         storedBreeds[index].image.url;
    
//     document.getElementById("breed_image").textContent =
//         storedBreeds[index].temperament

//     document.getElementById('wiki_link').href =
// };




// [
//   {
//     id: 'ebv',
//     url: 'https://cdn2.thecatapi.com/images/ebv.jpg',
//     width: 176,
//     height: 540,
//     breeds: [],
//     favourite: {},
//   },
// ];
