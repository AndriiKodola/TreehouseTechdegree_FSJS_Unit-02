/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

//listens for all the DOM content to be loaded before runing JavaScript
document.addEventListener('DOMContentLoaded', () => {


  const listContainer = document.getElementsByClassName('page')[0];
        studentListItems = document.getElementsByClassName('student-item');
        navPanel = document.createElement('nav');

  //Paginates passed studet list by creating of an array (of pages) of arrays (of students per page)
  const paginateList = (list) => {
    const paginatedList = [];
          perPageList = [];

    for (let i = 0; i < list.length; i++) {
      perPageList.push(list[i]);

      if (i%10 === 9 || i === list.length - 1) { //creates a new element array of pages when 10 students per page limit reached or our list ended
        paginatedList.push(perPageList);
        perPageList = [];
      }
    }

    return paginatedList;
  };

  //paginates our list and assigns it to the variable
  let paginatedList = paginateList(studentListItems);

  //creates list items for passed page number and replaces existing list with the one created
  const showPage = (pageNum) => {
    const studentList = document.getElementsByClassName('student-list');
          perPageList = [];

    for (let i = 0; i < paginatedList[pageNum-1].length; i++) {
       perPageList += `
        <li class="student-item cf">
          ${paginatedList[pageNum-1][i].innerHTML}
        </li>
        `;
    }
    console.log(studentList[0].innerHTML);
    studentList[0].innerHTML = perPageList;
    console.log(studentList[0].innerHTML);
  };

  //shows first page for a start
  showPage(1);

  //creates nav bar according to design.css styles and appends it to the DOM
  const appendPageLinks = (paginatedList) => {
    const navPanelList = document.createElement('ol');
    navPanel.appendChild(navPanelList);
    navPanelList.listStyleType = 'none';
    navPanelList.classList.add('pagination');

    for (let i = 1; i <= paginatedList.length; i++) {
      let listItem = document.createElement('li');
      let navButton = document.createElement('button');
      listItem.appendChild(navButton);
      listItem.style.display = 'inline-block';
      navButton.type = 'button';
      navButton.textContent = `${i}`;
      navPanelList.appendChild(listItem);
    }
    listContainer.appendChild(navPanel);
  };

  appendPageLinks(paginatedList);

  //listens for button click to change list accordingly
  navPanel.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      showPage(e.target.textContent);
    }
  });



/***--------------Exceed expectations content----------------------***/

//Creating and styling according to design.css search nodes
const pageHeader = document.getElementsByClassName('page-header')[0];

const searchDiv = document.createElement('div');
      searchField = document.createElement('input');
      searchButton = document.createElement('button');
      searchDiv.classList.add('student-search');
      searchField.type = 'search';
      searchButton.type = 'button';
      searchButton.textContent = 'Search';

      searchDiv.appendChild(searchField);
      searchDiv.appendChild(searchButton);
      pageHeader.appendChild(searchDiv);


      searchButton.addEventListener('click', () => {
        const foundList = [];
              searchName = searchField.value;
              searchField.value = '';//empty the search field

        //creating a list of matches
        for (let i = 0; i < studentListItems.length; i++ ) {
          const currentStudent = studentListItems[i];
                studentName = currentStudent.getElementsByTagName('h3')[0].textContent;

          if (studentName === searchName) {
            foundList.push(currentStudent);
          }
        }

        //Displays message if no matches found or match list if there were any
        if (!foundList.length) {
          const searchMessage = document.createElement('span');
                searchMessage.textContent = 'No matches found.';

                searchDiv.prepend(searchMessage);
                setTimeout(searchDiv.removeChild(searchDiv.childNodes[0]), 3000);
        } else {
          //paginating matches list
          paginatedList = paginateList(foundList);

          //editing DOM structure to display search results
          showPage(1);
          navPanel.innerHTML = '';//deleting previous nav bar
          appendPageLinks(paginatedList);
        }
      });
});
