document.addEventListener('DOMContentLoaded', (event) => {

    // It selects all paragraphs, pre elements, and unordered lists within the content area
    const contents = document.querySelectorAll('.content p, .content pre, .content ul');
    let delay = 0;

    // for each elements
    contents.forEach((element) => {
        
        if (element.tagName === 'UL') {
            // Handle lists
            const listItems = element.querySelectorAll('li');
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.opacity = '1';
                listItems.forEach((item, index) => {
                    const text = item.textContent;
                    item.textContent = '';
                    setTimeout(() => {
                        typeText(item, text);
                    }, index * 500);
                });
            }, delay);

            delay += (listItems.length * 500) + 1000;
        } else {
            // Handle paragraphs and pre elements
            const text = element.textContent;
            element.textContent = '';
            
            setTimeout(() => {
                typeText(element, text);
            }, delay);

            delay += text.length * 20 + 500; // Adjust delay based on text length
        }
    });

    function typeText(element, text) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text[i];
                i++;
            } else {
                clearInterval(interval);
            }
        }, 20);
    }
});