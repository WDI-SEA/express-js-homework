document.addEventListener('DOMContentLoaded', function(){
    const randomButton = document.getElementById('randomButton');
    randomButton.addEventListener('click', function(e){
        console.log("random button clicked");
        let randomZipUrl = '/weather/' + Math.floor(Math.random()*100000);
        window.location.href = randomZipUrl;
    })
    console.log('weatherjs loaded');
})