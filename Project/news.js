// e08ef77a4d974d1ab15ec9bb6d0b188d
console.log("hello i am here");
let source = 'in';
let apiKey = 'e08ef77a4d974d1ab15ec9bb6d0b188d';

let accordionExample = document.getElementById('accordionExample');

const xhr = new XMLHttpRequest();
xhr.open('GET',`https://newsapi.org/v2/top-headlines?country=${source}&apiKey=${apiKey}`,true);

xhr.onload = function () {
  if(this.status === 200){
    let json = JSON.parse(this.responseText);
    let articles = json.articles
    let newsHtml = "";
    console.log(articles);
    articles.forEach(function (element,index) {
     let news = `
                <div class="card">
                  <div class="card-header" id="heading${index}">
                    <h2 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                        aria-expanded="true" aria-controls="collapse${index}">
                        <b>Breaking News : ${index+1}.</b> ${element["title"]}
                      </button>
                    </h2>
                  </div>

                  <div id="collapse${index}" class="collapse " aria-labelledby="heading${index}" data-parent="#accordionExample">
                    <div class="card-body"> ${element["content"]}.<a href="${element["url"]}" target="blank" >Read more</a>
                    </div>
                  </div>
                </div> `;
      newsHtml += news;          
    });
    accordionExample.innerHTML = newsHtml;
    // console.log(articles)
  }
  else{
      console.log('some error occured ');
  }
}
xhr.send();

