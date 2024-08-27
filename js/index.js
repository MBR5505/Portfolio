const btn = document.querySelector(".kreft");

const darkMode = (kaboom) => {
    const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color').trim();
    
    if (currentColor !== 'black') {
        document.documentElement.style.setProperty('--background-color', 'black');
        document.documentElement.style.setProperty('--text-color', 'white');
    } else {
        document.documentElement.style.setProperty('--background-color', 'white');
        document.documentElement.style.setProperty('--text-color', 'black');

    }
};

const lightMode = (kaboom) =>{

}