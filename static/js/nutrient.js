fetch("/static/prediction-data/nutrients.json")
  .then((response) => response.json())
  .then((json) => {
    console.log("Nutrients:", json);
    let prediction = document.querySelector("#leaf-color-js").innerHTML;
    prediction = prediction.slice(1);

    nutrientData = json.find((item) => item.leafColor == prediction);
    console.log("Nutrient Data: ", nutrientData);

    //Nitrogen
    let nitrogens = document.querySelector("#nitrogens-js");
    nutrientData.nitrogen.forEach((nitrogen) => {
      nitrogens.innerHTML += `<span>${nitrogen}</span>`;
    });

    // Image
    let image = document.querySelector("#image-js");
    image.innerHTML += `<img src="/static/prediction-data/${nutrientData.image}" />`;
  });
