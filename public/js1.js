document.addEventListener('DOMContentLoaded', function() {

    const CreateList = document.getElementById('AddNewList');
    const Stylekonteiner = document.getElementById('StyleKonteiner');
    const listNameInput = document.getElementById('listName');
    const nei = document.getElementById('nei');

    let array1 = [];

    CreateList.addEventListener('click', function(){
        // Lager listene:

        array1.push({navn: CreateList.value, item: []})

        console.log(array1)
        const createnewq = document.createElement('div');
        Stylekonteiner.appendChild(createnewq);
        createnewq.id = "CreatedNewList";

        
        
        const listName = document.createElement('h2')
        listName.textContent = listNameInput.value;
        createnewq.appendChild(listName);
        const input = document.createElement('input');
        input.type = 'text';
        createnewq.appendChild(input);
        const button = document.createElement('button');
        createnewq.appendChild(button);
        button.textContent = "Add to list";
        const ul = document.createElement('ul');
        createnewq.appendChild(ul);
                
        listNameInput.value = '';

        saveInput();


        button.addEventListener('click', function(){
            if(input.value == ''){
                alert('You have to write something before adding a new list')
            }
            else{
                const newlist = document.createElement('li');
                newlist.id = 'unchecked';
                newlist.textContent = input.value;
                ul.appendChild(newlist);
        
                newlist.addEventListener('click', function(){
                    if(newlist.id != 'checked'){
                        newlist.id = 'checked';
                        saveInput();

                    }
                    else{
                        newlist.id = 'unchecked';
                        saveInput();

                    }
                });
        
                input.value = '';
            }
            saveInput();

        });

        
        
    });



    Stylekonteiner.innerHTML = localStorage.getItem('data');




    const scrollRightButton = document.getElementById('scrollRightButton');
    
    scrollRightButton.addEventListener('click', function() {
        // Scroll the document horizontally one screen length to the right smoothly
        window.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    });


    function saveInput(){
        localStorage.setItem("data", Stylekonteiner.innerHTML);  //Saver alt som er inne i syling div'en jeg lagde i localstorage. "InnerHTML" betyr alt av html som er inne i variablen jeg la til.
    }

    localStorage.setItem('Array', array1);

    
    nei.addEventListener('click', function() {
        localStorage.clear();
        location.reload(); 
    });
});