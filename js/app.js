document.addEventListener('DOMContentLoaded', () => {
    // استهداف جميع العناصر المطلوبة من الصفحة
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const errorMsg = document.getElementById('error-msg');
    const counter = document.getElementById('counter');
    
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');

    // متغير لتتبع حالة الفلتر الحالي
    let currentFilter = 'all';

    // 1. ربط الافينتات بالدوال المنفصلة
    todoForm.addEventListener('submit', addToList);
    todoList.addEventListener('click', handleTodoClick);

    filterAll.addEventListener('click', handleFilterAll);
    filterActive.addEventListener('click', handleFilterActive);
    filterDone.addEventListener('click', handleFilterDone);

    // --- الدوال المنفصلة ---

    // دالة الإضافة
    function addToList(e) {
        e.preventDefault();
        
        let taskText = todoInput.value.trim();
        
        if (taskText === "") {
            errorMsg.classList.remove('hidden');
            return;
        }
        
        errorMsg.classList.add('hidden');
        
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;
        
        todoList.appendChild(li);
        todoInput.value = "";
        
        updateCounter();
        applyFilter();
    }

    // دالة تفويض الأحداث (للحذف والتحديد)
    function handleTodoClick(e) {
        const target = e.target;
        const li = target.closest('li');

        if (!li) return;

        // الحذف
        if (target.classList.contains('delete-btn')) {
            li.remove();
            updateCounter();
            return;
        }

        // التحديد كمنجز (Toggle)
        if (target.classList.contains('task-text') || target.tagName === 'LI') {
            li.classList.toggle('completed');
            updateCounter();
            applyFilter();
        }
    }

    // دوال الفلاتر
    function handleFilterAll() {
        currentFilter = 'all';
        setActiveFilterButton(filterAll);
        applyFilter();
    }

    function handleFilterActive() {
        currentFilter = 'active';
        setActiveFilterButton(filterActive);
        applyFilter();
    }

    function handleFilterDone() {
        currentFilter = 'done';
        setActiveFilterButton(filterDone);
        applyFilter();
    }

    function applyFilter() {
        const items = todoList.querySelectorAll('li');
        items.forEach(li => {
            const isCompleted = li.classList.contains('completed');
            
            if (currentFilter === 'all') {
                li.style.display = '';
            } else if (currentFilter === 'active' && isCompleted) {
                li.style.display = 'none';
            } else if (currentFilter === 'done' && !isCompleted) {
                li.style.display = 'none';
            } else {
                li.style.display = '';
            }
        });
    }

    function setActiveFilterButton(activeBtn) {
        [filterAll, filterActive, filterDone].forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    // دالة العداد
    function updateCounter() {
        const items = todoList.querySelectorAll('li');
        let activeCount = 0;
        
        items.forEach(li => {
            if (!li.classList.contains('completed')) {
                activeCount++;
            }
        });
        
        counter.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
    }
});
