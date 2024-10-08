class Activity{
    constructor(id, title, description, imgUrl){
    this.id=id;
    this.title=title;
    this.description=description;
    this.imgUrl= imgUrl;      
}}

class Repository{
    constructor(){
        this.activities=[];
        this.idActual=0;
    }

    getAllActivities(){
        return this.activities;
    }

    createActivity(title, description, imgUrl){
        this.idActual++;
        const actividad=new Activity(this.idActual, title, description, imgUrl);
        this.activities.push(actividad);
    }

    deleteActivity(id){
        this.activities = this.activities.filter((activity) => activity.id !== id);
    }
}

const newRepository  = new Repository();

//Recibir por parámetro un objeto instancia de Activity

function createActivityCard(activity){
    // extraer sus propiedades en variables utilizando destructuring
    const {title, description,imgUrl,id}=activity;

    // crear los elementos html que formaran parte de la tarjeta
    const cardDiv = document.createElement('div');
    const titleElement = document.createElement('h3');
    const descriptionElement = document.createElement('p');
    const imageElement = document.createElement('img');
    const buttonElement = document.createElement('button');
    
    // asignar los valores a las propiedades correspondientes.
    titleElement.innerHTML = title;
    descriptionElement.innerHTML = description;
    imageElement.src = imgUrl;
    buttonElement.innerHTML ="Eliminar actividad";

    // agregar a los elementos las clases CSS correspondientes
    cardDiv.classList.add("activity-card");
    titleElement.classList.add("activity-title");
    descriptionElement.classList.add("activity-description");
    imageElement.classList.add("activity-image");
    buttonElement.classList.add("activity-button-delete");

    // Appendear al nuevo div los elementos creados anteriormente

    cardDiv.appendChild(titleElement);
    cardDiv.appendChild(imageElement);
    cardDiv.appendChild(descriptionElement);
    cardDiv.appendChild(buttonElement);

    // Funcion para eliminar la actividad (se hace aca adentro)
    buttonElement.addEventListener('click',()=>{
        newRepository.deleteActivity(id);
        renderActivities();
    })

    // Retornar el div finalizado
    return cardDiv;
}

function renderActivities(){
    //Seleccionar el contenedor
    const activityContainer = document.getElementById('activity-container');
    //Vaciar el contenido actual
    activityContainer.innerHTML='';
    //Obtener el listado completo de actividades
    const activities = newRepository.getAllActivities();
    // Mapear el listado de actividades a elementos html
    const activityCards = activities.map(a=>createActivityCard(a));

    activityCards.forEach((card)=>{
        activityContainer.appendChild(card);
    });
}

function handlerActivities(){
    //Seleccionar los inputs
    const titleInput = document.getElementById('activity-title');
    const imageInput = document.getElementById('activity-image');
    const descriptionInput = document.getElementById('activity-description');
    //Tomas los valores ingresados en los inputs y guardarlos en variables.
    const title = titleInput.value;
    const image = imageInput.value;
    const description = descriptionInput.value;
    //Validar que los campos no estan vacios
    if(!title || !image || !description){
        alert('Completa todos los campos');
        return;
    }
    
    //Llamar al método correspondiente de la instancia Repository
    newRepository.createActivity(title,description,image);
    renderActivities();

    //Limpiar los inputs luego de agregar la card.
    titleInput.value="";
    imageInput.value="";
    descriptionInput.value="";
}

/*Seleccionar el botón que disparará el evento de agregar actividad y agregar un Event Listener.
El evento, al dispararse, debe ejecutar la función que creamos en el punto anterior*/
const addActivityButton = document.getElementById('add-activity-button');
addActivityButton.addEventListener('click', handlerActivities);
