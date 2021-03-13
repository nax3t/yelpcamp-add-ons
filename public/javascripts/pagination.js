const paginate = document.getElementById('paginate');
const $campgroundsContainer = $('#campgrounds-container');
paginate.addEventListener('click', function(e) {
    e.preventDefault();
    fetch(this.href)
        .then(response => response.json())
        .then(data => {
            for(const campground of data.docs) {
                let template = generateCampground(campground);
                $campgroundsContainer.append(template);
            }
            let { nextPage } = data;
            this.href = this.href.replace(/page=\d+/, `page=${nextPage}`);
        })
        .catch(err => console.log('ERROR',err));
})

function generateCampground(campground) {
    let template = `<div class="card mb-3">
    <div class="row">
        <div class="col-md-4">
            <img class="img-fluid" alt="" src="${ campground.images.length ? campground.images[0].url : 'https://res.cloudinary.com/douqbebwk/image/upload/v1600103881/YelpCamp/lz8jjv2gyynjil7lswf4.png' }">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${ campground.title  } </h5>
    
                <p class="card-text">${ campground.description  }</p>
                <p class="card-text">
                    <small class="text-muted">${ campground.location }</small>
                </p>
                <a class="btn btn-primary" href="/campgrounds/${campground._id }">View ${campground.title }</a>
            </div>
        </div>
    </div>
    </div>`;
    return template;
}