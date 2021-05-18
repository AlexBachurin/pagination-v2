//items to show
const items = [{
        name: 'item1'
    },
    {
        name: 'item2'
    },
    {
        name: 'item3'
    },
    {
        name: 'item4'
    },
    {
        name: 'item5'
    },
    {
        name: 'item6'
    },
    {
        name: 'item7'
    },
    {
        name: 'item8'
    },
    {
        name: 'item9'
    },
    {
        name: 'item10'
    },
    {
        name: 'item11'
    },
    {
        name: 'item12'
    },
    {
        name: 'item13'
    },
    {
        name: 'item14'
    }
]




//get elems
const pagesContainer = document.querySelector('.pagination__pages'),
    itemsContainer = document.querySelector('.pagination__items');

//set variable how many items u want on page
const itemsOnPage = 2;

//set container style depending on how much items to show
setupItemsContainer(itemsOnPage);

//how many pages to show
const totalPages = pagesToShow(itemsOnPage);

//setup pages
createPages(totalPages, 1)


//dynamically create pages
function createPages(totalPages, currentPage) {

    let liTag = '';
    let active; // active class
    let beforePages = currentPage - 1; // pages to show before current page
    let afterPages = currentPage + 1; //pages to show after current page
    if (currentPage > 1) { //if page value more than 1, add li with prev btn
        //add to liTag and assign onclick function with params of totalPages and currentPage - 1
        liTag += `<li class="pagination__btn pagination__btn_prev" onclick="createPages(${totalPages}, ${currentPage - 1})"><i class="fas fa-angle-left"></i> Prev</li>`
    }
    if (currentPage > 2) { //if page value > 2, then add new tag with value of 1
        liTag += ` <li class="pagination__number" onclick="createPages(${totalPages}, ${1})">1</li>`
        if (currentPage > 3) { //if page value > 3, then add dots
            liTag += ` <li class="pagination__dots">...
                <form class="pagination__form" action="#">
                    <input class="pagination__input" type="number">
                    <button class="pagination__form-btn" type="submit">GO</button>
                </form>
            </li>`
        }
    }

    //how many pages or li show before the current page, use it if theres many pages
    //not use it if theres litlle pages, like 4 or 5
    // if (currentPage === totalPages) {
    //     beforePages = beforePages - 2;
    // } else if (currentPage === totalPages - 1) {
    //     beforePages = beforePages - 1;
    // }
    // //how many pages or li show after the current page
    // if (currentPage === 1) {
    //     afterPages = afterPages + 2;
    // } else if (currentPage === 2) {
    //     afterPages = afterPages + 1;
    // }

    //show pages numbers(beforePage, currentPage, afterPage) 
    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
        //check to not add value more than totalpages 
        if (pageLength > totalPages) {
            continue;
        }
        //if currentPage = 1; then pageLength = beforePages will be 0
        //then add 1 to pageLength, so we will not show value < 0
        if (pageLength === 0) {
            pageLength = pageLength + 1;
        }
        //assign active class for currentPage
        if (currentPage === pageLength) {
            active = `active`;
        } else {
            active = ``;
        }
        liTag += `<li class="pagination__number ${active}" onclick="createPages(${totalPages}, ${pageLength})">${pageLength}</li>`
    }

    if (currentPage < totalPages - 1) { //if page value < totalpages - 1, then add new tag with value of totalpages

        if (currentPage < totalPages - 2) { //if page value < totalpages - 2, then add dots before last element
            liTag += ` <li class="pagination__dots">...
            <form class="pagination__form" action="#">
                <input class="pagination__input" type="number">
                <button class="pagination__form-btn" type="submit">GO</button>
            </form>
        </li>`
        }
        liTag += ` <li class="pagination__number" onclick="createPages(${totalPages}, ${totalPages})">${totalPages}</li>`
    }
    if (currentPage < totalPages) { //if page value less then total amount of pages, then add li with next btn
        liTag += `<li class="pagination__btn pagination__btn_next" onclick="createPages(${totalPages}, ${currentPage +1})"><i class="fas fa-angle-right"></i> Next</li>`
    }


    //add html to parent
    pagesContainer.innerHTML = liTag;
    //show items for current page
    showItems(currentPage)

    //get dots
    const dots = document.querySelectorAll('.pagination__dots');
    //if theres dots elements
    if (dots.length) {
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => { //get them and add event listener
                const form = dot.querySelector('form'); //on dot click show form
                form.classList.add('show-form')
                form.addEventListener('submit', (e) => { //add event listener to submit
                    e.preventDefault();
                    const input = form.querySelector('input'); //get value from input
                    let value = +input.value; // !!!important to transform to integer!!!
                    if (value) { //check if user put something into input
                        //check values range and make adjustments
                        if (value <= 0) {
                            value = 1;
                            // pagesContainer.innerHTML = ''
                            createPages(totalPages, value);
                        } else if (value > totalPages) {
                            value = totalPages;
                            createPages(totalPages, value);
                        } else {
                            createPages(totalPages, value);
                        }
                    // else stay on same page
                    } else {
                        createPages(totalPages, currentPage)
                    }
                })
            })
        })
    }


}





//how many pages we need to show, pass variable with items on page
function pagesToShow(itemsNum) {
    //get quantity of pages based on data items length + how many items we want to show on page
    const pagesToShow = Math.ceil(items.length / itemsNum);
    return pagesToShow;
}

//show items
function showItems(pageNum) {

    //get items for current page
    const itemsArr = getItemsForCurPage(pageNum)

    //show on page, transform array of items for current page
    itemsContainer.innerHTML = `${itemsArr.map(item => {
        return `<div class="pagination__item">${item.name}</div>`
    }).join('')}`
}

//get items for current page
function getItemsForCurPage(pageNum) {
    //formula from where to where to slice our data array
    const from = (pageNum - 1) * itemsOnPage
    const to = from + itemsOnPage;
    //return items for current page
    return items.slice(from, to);
}

//setup item container
function setupItemsContainer(itemsNum) {
    if (itemsNum <= 2) {
        itemsContainer.classList.add('small-container')
    } 
}