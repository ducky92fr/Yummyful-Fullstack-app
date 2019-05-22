const paginationContainer = document.getElementById('pagination')
const Pagination = {

  markup: '',
  page:1,
  step:2,
  // converting initialize data
  Extend: function(data) {
      Pagination.size = data ;
  },

  // add pages by number (from [s] to [f])
  Add: function(s, f) {
      for (let i = s; i < f; i++) {
          Pagination.markup += `
          <li>
          <a class="pagination-link" aria-label="Goto page ${i}">${i}</a>
        </li>`;
      }
  },

  // add last page with separator
  Last: function() {
      Pagination.markup += 
      `<li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" aria-label="Goto page ${Pagination.size}">${Pagination.size}</a></li>`;
  },

  // add first page with separator
  First: function() {
      Pagination.markup += `
      <li>
      <a class="pagination-link" aria-label="Goto page 1">1</a>
    </li>
    <li><span class="pagination-ellipsis">&hellip;</span></li>`;
  },

  // change page
  Click: function() {
      Pagination.page = +this.innerHTML;
      Pagination.Start();
  },

  // binding pages
  Bind: function() {
      const a = paginationContainer.getElementsByTagName('a');
      //check if this is current page
      for (let i = 0; i < a.length; i++) {
          if (+a[i].innerHTML === Pagination.page) a[i].classList.add("is-current")
          a[i].onclick = Pagination.Click
      }
  },


  // find pagination type
  Start: function() {
      if (Pagination.size < Pagination.step * 2 + 6) {
          Pagination.Add(1, Pagination.size + 1);
      }
      else if (Pagination.page < Pagination.step * 2 + 1) {
          Pagination.Add(1, Pagination.step * 2 + 4);
          Pagination.Last();
      }
      else if (Pagination.page > Pagination.size - Pagination.step * 2) {
          Pagination.First();
          Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
      }
      else {
          Pagination.First();
          Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
          Pagination.Last();
      }
      Pagination.Create();
  },


  Create: function() {
    paginationContainer.innerHTML = Pagination.markup;
    Pagination.markup = '';
    Pagination.Bind();
  },

  // init
  Init: function(data) {
      Pagination.Extend(data);
      Pagination.Create();
      Pagination.Start();
  }
};