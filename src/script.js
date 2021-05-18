//get elems

const pagesContainer = document.querySelector('.pagination__pages'),
    itemsContainer = document.querySelector('.pagination__items');

//main handler of clicking on pages
function pageHandler(totalPages, page) {
    let currentPage = page;
    let liTag = '';
    let active; // active class
    let beforePages = currentPage - 1; // pages to show before current page
    let afterPages = currentPage + 1; //pages to show after current page
    if (currentPage > 1) { //if page value more than 1, add li with prev btn
        //add to liTag and assign onclick function with params of totalPages and currentPage - 1
        liTag += `<li class="pagination__btn pagination__btn_prev" onclick="pageHandler(${totalPages}, ${currentPage - 1})"><i class="fas fa-angle-left"></i> Prev</li>`
    }
    if (currentPage > 2) { //if page value > 2, then add new tag with value of 1
        liTag += ` <li class="pagination__number" onclick="pageHandler(${totalPages}, ${1})">1</li>`
        if (currentPage > 3) { //if page value > 3, then add dots
            liTag += ` <li class="pagination__dots">...</li>`
        }
    }

     //how many pages or li show before the current page
    if (currentPage === totalPages) {
        beforePages = beforePages - 2;
    } else if (currentPage === totalPages - 1) {
        beforePages = beforePages -1;
    }
    //how many pages or li show after the current page
    if (currentPage === 1) {
        afterPages = afterPages + 2;
    } else if (currentPage === 2) {
        afterPages = afterPages + 1;
    }

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
        liTag += `<li class="pagination__number ${active}" onclick="pageHandler(${totalPages}, ${pageLength})">${pageLength}</li>`
    }
   
    if (currentPage < totalPages - 1) { //if page value < totalpages - 1, then add new tag with value of totalpages

        if (currentPage < totalPages - 2) { //if page value < totalpages - 2, then add dots before last element
            liTag += ` <li class="pagination__dots">...</li>`
        }
        liTag += ` <li class="pagination__number" onclick="pageHandler(${totalPages}, ${totalPages})">${totalPages}</li>`
    }
    if (currentPage < totalPages) { //if page value less then total amount of pages, then add li with next btn
        liTag += `<li class="pagination__btn pagination__btn_next" onclick="pageHandler(${totalPages}, ${currentPage +1})"><i class="fas fa-angle-right"></i> Next</li>`
    }


    //add html to parent
    pagesContainer.innerHTML = liTag;
}

pageHandler(20, 5);