document.getElementById('colorPicker').addEventListener('input', async function() {
    const selectedColor = this.value.substring(1); // Remove the '#' from the hex color
    const mode = 'triad'; // You can also allow the user to select different modes
    const count = 4; // Number of colors you want from the scheme

    // Fetch the color scheme from the API
    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${mode}&count=${count}`);
    const data = await response.json();

    // Extract the colors from the response
    const colors = data.colors;

    // Update CSS variables with the new colors
    document.documentElement.style.setProperty('--primary-color', `#${selectedColor}`);
    document.documentElement.style.setProperty('--secondary-color', colors[1].hex.value);
    document.documentElement.style.setProperty('--tertiary-color', colors[2].hex.value);
    document.documentElement.style.setProperty('--quaternary-color', colors[3].hex.value);
});