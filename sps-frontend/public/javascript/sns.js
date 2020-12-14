'use strict';
//------------------------------Variables------------------------------//    

let globalFeedData; // global for save feed fetch result data; Never Delete 🔥
const DATA_PER_PAGE = 5;
const lastPage = 10;
let currentPage = 1;
const msgLoading = document.getElementById("msg-loading");

//------------------------------Get Dom------------------------------//

const writeForm = document.getElementById("write-form"); // 글쓰기 버튼 DOM
const commentForm = document.querySelector("#comment-form"); // 댓글 달기 버튼 DOM (In modal)

//------------------------------Function------------------------------//

// 🔥🔥🔥🔥🔥 군집화 된 테이블 'same_cluster_user' 체크 먼저 해줘야함 🔥🔥🔥🔥🔥 //
// same_cluster_user -> user_id 기반 검색 -> 결과값으로 나오는 user_id_same value 기준으로 필터 랜더링 
const checkClustered = () => {

    fetch('http://44.242.175.149:3000/snsboard/cluster', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit 
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
        const { status } = response;

        // 여기 고치기 !!! 
        if (status === 403) return Promise.reject(new Error("로그인 해야 볼 수 있는 페이지 입니다."));
        else if (status === 400 || status === 404) return Promise.reject(new Error("잘못된 페이지 접근입니다."));
        else if (status === 422) return Promise.reject(new Error("입력이 잘못 되었습니다."));
        return response.json();
    }).then((data) => { // 성공하면 여기오고

        // 여기서 나온 유저 결과 값 기반으로 /snsboards/user 에 for로 때려야함 ;; 

        $("#comment__value").val("");
        Swal.fire({
            text: "댓글 등록 완료",
            confirmButtonColor: '#4E73DF',
            confirmButtonText: 'OK',
        });
        getComments(dataBody['board_id']);
    }).catch((error) => { // 실패하면 여기온다
        console.warn(error);
        alert(error);
    });
}


// 글쓰기 버튼에 글쓰기 이벤트 추가하기 
const writeEvent = (event) => {
    event.preventDefault();
    const dataBody = Object.fromEntries(new FormData(event.target));

    fetch('http://44.242.175.149:3000/snsboards', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataBody) // // body data type must match "Content-Type" header

    }).then((response) => {
        const { status } = response;

        // 여기 고치기 !!! 
        if (status === 403) return Promise.reject(new Error("로그인 해야 볼 수 있는 페이지 입니다."));
        else if (status === 400 || status === 404) return Promise.reject(new Error("잘못된 페이지 접근입니다."));
        else if (status === 422) return Promise.reject(new Error("입력이 잘못 되었습니다."));
        return response.json();
    }).then((data) => { // 성공하면 여기오고
        $('#writeModal').modal("hide"); // 모달창 닫기 

        Swal.fire({
            text: "글 등록 완료",
            confirmButtonColor: '#4E73DF',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) window.location.reload();
        });

    }).catch((error) => { // 실패하면 여기온다
        console.warn(error);
        alert(error);
    });
};

// 모든 sns board 받아오기 -> 이니셜 라이징 함수임, 즉 새로고침에 한 번 호출 
const getAllBoards = () => {

    // 모든 snsboards 받아오기 => 랜덤 피드임 
    fetch('http://44.242.175.149:3000/snsboards', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit 
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
        const { status } = response;

        // 여기 고치기 !!! 
        if (status === 403) return Promise.reject(new Error("로그인 해야 볼 수 있는 페이지 입니다."));
        else if (status === 400 || status === 404) return Promise.reject(new Error("잘못된 페이지 접근입니다.")); // 이따 물어봐야지
        else if (status === 422) return Promise.reject(new Error("입력이 잘못 되었습니다."));
        return response.json();
    }).then((data) => { // 성공하면 여기오고
        globalFeedData = data['boards']; // update global Data
        document.getElementById('sns-card-body').innerHTML = ""; // 리로드 전 카드 비워버리기
        const length = data['boards'].length;

        // add Data -> 최근 글 기준으로 피드 랜더링 
        for (let i = length - 1; i >= 0; i--) {
            const randomImg = Math.floor(Math.random() * (9 - 1)) + 1;
            const randomLike = Math.floor(Math.random() * (6334 - 1)) + 1;

            const tagString = `
                <li class="card mb-4 card__list feedCard" data-target="#feedModal" data-target-id="${data['boards'][i]['id']}">
                    <div name="card-body" class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="card__body__title">
                                    <div class="text-lg font-weight-bold text-primary text-uppercase mb-1">
                                        ${data['boards'][i]['title']} </div>
                                    <div class="card__body__title__date"> ${data['boards'][i]['created_at']}</div>
                                </div>
                                <div class="text-sm mb-0 font-weight-bold text-gray-800">${data['boards'][i]['user_id']}</div>
                            </div>
                            <div class="col-auto">
                                <div style="width:50px;"><img class="rounded-circle img-fluid" src="public/images/undraw_profile.svg" style="width : 100%; object-fit: contain"></div>
                            </div>
                        </div>
                        
                        <hr>
                        <div style="text-align: center;">
                            <img class="feedModal__content__img sidebar-card-illustration mb-2" src="public/images/sns_img${randomImg}.png" alt="pie-graph" />
                        </div>

                        <div class="mt-4 text-center small">
                            <span class="mr-2" style="color: #4e73df;">식품</span>
                            <span class="mr-2" style="color: #1cc88a;">의류</span>
                            <span class="mr-2" style="color: #36b9cc;">교육</span>
                            <span class="mr-2" style="color: #a4dd4a;">교통</span>
                            <span class="mr-2" style="color: #9c6be8;">생활</span>
                        </div>
                    </div>

                    <div class="card-footer">
                        <div style="text-align: center;">
                            <img class="like__image mb-2" src="public/images/like_png.png" alt="like image" /> ${randomLike}
                        </div>
                    </div>
                </li>`;
            $('#sns-card-body').append(tagString);
        }
        // 안우주 사랑해 ❤️
        // Get category form and Set Form Action Event, 만든 feedcard에 모두 이벤트 추가해주기 
        const feedCards = document.querySelectorAll(".feedCard");
        feedCards.forEach((feedCard) => { feedCard.addEventListener('click', feedCardEvent); });

        // 좋아요 액션 추가 
        const likeBtns = document.querySelectorAll(".like__image");
        likeBtns.forEach((likeBtn) => { likeBtn.addEventListener('click', likeBtnEvent); });
    }).catch((error) => { // 실패하면 여기온다
        console.warn(error);
        alert(error);
    });
};

// feedCard에 event 추가하기 
function feedCardEvent() {
    const boardID = this.getAttribute('data-target-id'); // this -> arrow function X

    const randomImg = Math.floor(Math.random() * (9 - 1)) + 1;

    // setUp madal's content data (text)
    document.getElementById('feedModal__header').innerText = globalFeedData[boardID - 1].title;
    document.getElementById('feedModal__content').innerHTML = `<img class="feedModal__content__img sidebar-card-illustration mb-2" src="public/images/sns_img${randomImg}.png" alt="pie-graph" /><br/>${globalFeedData[boardID - 1].content}`;
    document.getElementById('comment__boardId_value').value = boardID;
    document.getElementById('comment__td').innerHTML = "";


    $('#feedModal').css({ transition: 'all 0.5s' });
    $('#feedModal').modal("show");

    // 만든 feedCard안에 있는 comment 불러오기 
    getComments(boardID);
}

// likeBtnEvent
const likeBtnEvent = (event) => {
    // console.log(event.target);
    // const nowLike = event.target;
    event.preventDefault();

    event.target.style.color = '#4e73df';
    event.target.style.background = '#4e73df';
    event.target.style['border-radius'] = "30px";
    
    const targetLikeNumber = event.target.parentNode.lastChild.textContent.trim();
    event.target.parentNode.lastChild.textContent = " " + String(Number(targetLikeNumber) + Number(1));
}

// 만든 feedCard안에 있는 comment 불러오기 
const getComments = (boardID) => {
    const url = `http://44.242.175.149:3000/snsboard/comment/${boardID}`;

    // Getting User's history data
    fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit 
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
        const { status } = response;

        // 여기 고치기 !!! 
        if (status === 403) return Promise.reject(new Error("로그인 해야 볼 수 있는 페이지 입니다."));
        else if (status === 400 || status === 404) return Promise.reject(new Error("잘못된 페이지 접근입니다.")); // 이따 물어봐야지
        else if (status === 422) return Promise.reject(new Error("입력이 잘못 되었습니다."));
        return response.json();
    }).then((data) => { // 성공하면 여기오고
        // console.log(data);
        const length = data.length;

        //add Data
        let tagString = "";
        for (let i = 0; i < length; i++) {
            tagString = tagString + `
            <div>
                <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                        <div style="width:35px;"><img class="rounded-circle img-fluid" src="public/images/undraw_profile.svg" style="object-fit: contain"></div>
                    </div>
                    
                    <div class="col mr-2">
                        <div class="text-sm text-primary mb-1">
                            <span class="card__list__boldtext"> ${data[i].user_id} </span></div>
                        <div class="text-md text-gray-800"><span> ${data[i].content} </span> </div>
                    </div>
                </div>
            </div>
            `;
        }// data get end
        $('#comment__td').html(tagString);

    }).catch((error) => { // 실패하면 여기온다
        console.warn(error);
        alert(error);
    });
}


// Event Listener for ADD COMMENTS 
const commentsAddEvent = (event) => {

    event.preventDefault();

    // getting Data From Form
    const dataBody = Object.fromEntries(new FormData(event.target));
    // console.log(dataBody);

    fetch('http://44.242.175.149:3000/snsboard/comments', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataBody)
    }).then((response) => {
        const { status } = response;

        // 여기 고치기 !!! 
        if (status === 403) return Promise.reject(new Error("로그인 해야 볼 수 있는 페이지 입니다."));
        else if (status === 400 || status === 404) return Promise.reject(new Error("잘못된 페이지 접근입니다."));
        else if (status === 422) return Promise.reject(new Error("입력이 잘못 되었습니다."));
        return response.json();
    }).then((data) => { // 성공하면 여기오고
        $("#comment__value").val("");
        getComments(dataBody['board_id']);
    }).catch((error) => { // 실패하면 여기온다
        console.warn(error);
        alert(error);
    });
};

//------------------------------무한 스크롤 부분------------------------------//

function observeLastChild(intersectionObserver) {
    const listChildren = document.querySelectorAll('.sns-body-card');
    listChildren.forEach(el => {
        if (!el.nextSibling && currentPage < lastPage) {
            intersectionObserver.observe(el);
        }
        else if (currentPage >= lastPage) {
            intersectionObserver.disconnect();
            msgLoading.textContent = "페이지 끝입니다.";
        }
    })
}

const observerOption = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threhold: 0.5
};

const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            msgLoading.classList.add("fade-in");
            setTimeout(() => {
                addData(++currentPage);
                observer.unobserve(entry.target);
                observeLastChild(observer);
                msgLoading.classList.remove("fade-in");
            }, 1000)
        }
    });
}, observerOption);
//------------------------------메인 init 부분------------------------------// sns.js 꼭 참조해야함! 

// 보드 다 불러오고 피드 랜더링 -> 피드 클릭하면 미리 만들어둔 모달창이 뜨는 방식임!
// -> 그렇기 때문에 피드 클릭 이벤트에 모달 자체를 업데이트 하는 정보가 필요함 
const init = () => {
    getAllBoards();
    writeForm.addEventListener('submit', writeEvent); // add 글쓰기 이벤트 
    commentForm.addEventListener('submit', commentsAddEvent); // feedCard안에 있는 코멘트에 event 추가해주기 
}

//------------------------------document get ready------------------------------//

document.addEventListener("DOMContentLoaded", function () {

    init(); // sns board and comment setup 

    // 모바일 환경에서는 사이드 바가 토글되게
    const windowWidth = $(window).width();
    if (windowWidth <= 768) {
        $('body').toggleClass('sidebar-toggled');
        $('#accordionSidebar').toggleClass('toggled');
    }

    // $(function () {
    //     $(window).scroll(function () {
    //         let $window = $(this);
    //         let scrollTop = $window.scrollTop();
    //         let windowHeight = $window.height();
    //         let documentHeight = $(document).height();

    //         console.log("documentHeight:" + documentHeight + " | scrollTop:" + scrollTop + " | windowHeight: " + windowHeight);

    //         // scrollbar의 thumb가 바닥 전 30px까지 도달 하면 리스트를 가져온다.
    //         if (scrollTop + windowHeight + 30 > documentHeight) {
    //             init();
    //         }
    //     });
    // });
});