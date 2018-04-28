var width = window.innerWidth;
var height = window.innerHeight;

var initialnumber = 547802;
var url = 'https://collectionapi.metmuseum.org/api/collection/v1/object/' + initialnumber;

var load = d3.request(url)
.mimeType("application/json")
.header("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWNjYWMyOTBAbmV3c2Nob29sLmVkdSIsInBlcm1pc3Npb25zIjp7InByb3ZlbmFuY2UiOmZhbHNlLCJ3ZWJMYWJlbCI6ZmFsc2V9LCJleHAiOjQ2NzgxNzgzODV9.HhOOmPn9LVY5C8A0HYKIHqTKIt9RV0ScrwnGfn8P0ag")
.get(function(error, data){
    if (error) throw error; 
    
    var payload = JSON.parse(data.response); 
    var imgUrl = [];
    for (var i=0; i<=payload.media.images.additionalImages.length-1; i++)
    {
     imgUrl.push(payload.media.images.additionalImages[i]);   
    }
    console.log(imgUrl);
    
    d3.select('#viz1')
    .style('background-color', 'lightpink')
    .selectAll('div.imgcont')
    .data(imgUrl)
    .enter()
        .append('div')
        .attr('class', 'imgcont')
        .append('img')
        .attr('src', function(data){return data.imageUrl})
    ;
    })
;

function updateData(){
    
    initialnumber = Math.floor(Math.random() * Math.floor(initialnumber));
    console.log(initialnumber);
    var newURL = 'https://collectionapi.metmuseum.org/api/collection/v1/object/' + initialnumber;
    console.log(newURL);
    
    var load = d3.request(newURL)
    .mimeType("application/json")
    .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWNjYWMyOTBAbmV3c2Nob29sLmVkdSIsInBlcm1pc3Npb25zIjp7InByb3ZlbmFuY2UiOmZhbHNlLCJ3ZWJMYWJlbCI6ZmFsc2V9LCJleHAiOjQ2NzgxNzgzODV9.HhOOmPn9LVY5C8A0HYKIHqTKIt9RV0ScrwnGfn8P0ag")
    .get(function(error, data){
        if (error) updateData(); 
        
        var payload = JSON.parse(data.response);
        console.log(payload.media.images.additionalImages);
        var imgUrl = [];
        for (var i=0; i<=payload.media.images.additionalImages.length-1; i++)
        {
            if (payload.media.images.additionalImages == null || payload.media.images.additionalImages == [])
            return imgUrl.push({imageUrl: 'https://media.giphy.com/media/A0CseU0ThXV3a/giphy.gif'});
            else imgUrl.push(payload.media.images.additionalImages[i]);
        }
        
        console.log(imgUrl);
        
        var newImg = d3.selectAll('div.imgcont')
        .data(imgUrl);

        newImg.exit().remove();
        
        newImg
        .enter()
        .append('div')
        .attr('class', 'imgcont')
        .merge(newImg)
        .append('img')
        .attr('src', function(data){return data.imageUrl}
        )
    ;
    })
;
}