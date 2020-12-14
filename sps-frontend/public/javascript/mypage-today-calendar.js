'use strict';

// '#4e73df', '#1cc88a', '#36b9cc', '#a4dd4a', '#9c6be8'
// ['#2e59d9', '#17a673', '#2c9faf', '#8ac430', '#7d59d3']

const initDate = '2019-11-01'; // new Date();

function calendarSetUp(data) {

    let calendarEventSet = [];

    // data object 가지고 동적 랜더링 
    for (const [key, value] of Object.entries(data)) {
        for (let i = 0; i < value.length; i++) {
            const element = value[i]; // 세부 결제 내역 내용 

            // setting up color // 식비(1), 의류(2), 교육(3), 교통(4), 생활(5)
            let targetColor = "";
            let renderText = "";
            if (value[i].category == "식비" || value[i].category == 1) {
                targetColor = '#2e59d9';
                renderText = "식비";
            }
            if (value[i].category == "의류" || value[i].category == 2) {
                targetColor = '#17a673';
                renderText = "의류";
            }
            if (value[i].category == "교육" || value[i].category == 3) {
                targetColor = '#2c9faf';
                renderText = "교육";
            }
            if (value[i].category == "교통" || value[i].category == 4) {
                targetColor = '#8ac430';
                renderText = "교통";
            }
            if (value[i].category == "생활" || value[i].category == 5) {
                targetColor = '#7d59d3';
                renderText = "생활";
            }

            // set up calendar color
            const calendarDateEvent = {
                title: "￦ " + value[i].Usam + ", " + renderText,
                start: value[i].Trdd.substring(0, 10), // + "T" + value[i].Txtm,
                // extendedProps: {
                //     department: value[i].AfstNm
                // },
                description: value[i].AfstNm,
                color: targetColor
                // textColor: 
            }
            calendarEventSet.push(calendarDateEvent);
        }
    }

    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        height: '100%',
        expandRows: true,
        slotMinTime: '08:00',
        slotMaxTime: '20:00',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialView: 'dayGridMonth',
        initialDate: initDate,
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        selectable: true,
        nowIndicator: true,
        dayMaxEvents: true, // allow "more" link when too many events
        events: calendarEventSet,
        /*
        [
            {
                title: 'All Day Event',
                start: initDate,
            },
            {
                title: 'Long Event',
                start: initDate,
                end: initDate + 3
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-09-09T16:00:00'
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2020-09-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2020-09-11',
                end: '2020-09-13'
            },
            {
                title: 'Meeting',
                start: '2020-09-12T10:30:00',
                end: '2020-09-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2020-09-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2020-09-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2020-09-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2020-09-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2020-09-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2020-09-28'
            }
        ]
        */
        // dateClick: function (info) {
        //     console.log(info.title);
        //     console.log(info.view.type);
        //     Swal.fire({
        //         text: info.description,
        //         confirmButtonColor: '#4E73DF',
        //         confirmButtonText: 'OK',
        //     });
        // }

    });
    calendar.render();
}
