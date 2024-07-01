document.addEventListener('DOMContentLoaded', (event) => {
    const content = document.querySelector('.content');
    const sections = Array.from(content.querySelectorAll('section'));
    let currentSectionIndex = 0;

    // Store the original content and remove it from the DOM
    const originalContent = sections.map(section => {
        const clone = section.cloneNode(true);
        section.innerHTML = '';
        return clone;
    });

    function processNextSection() {
        if (currentSectionIndex >= sections.length) return;

        const section = sections[currentSectionIndex];
        const originalSection = originalContent[currentSectionIndex];
        const sectionId = section.id;

        if (sectionId === 'home' || sectionId === 'social') {
            typeSection(section, originalSection, () => {
                currentSectionIndex++;
                processNextSection();
            });
        } else if (sectionId === 'experience') {
            typePrompt(section, originalSection, () => {
                showJobs(section, originalSection);
                currentSectionIndex++;
                processNextSection();
            });
        } else if (sectionId === 'projects') {
            typePrompt(section, originalSection, () => {
                showProjects(section, originalSection);
                currentSectionIndex++;
                processNextSection();
            });
        }
    }

    function typeSection(section, originalSection, callback) {
        const elements = Array.from(originalSection.children);
        let elementIndex = 0;

        function typeNextElement() {
            if (elementIndex >= elements.length) {
                callback();
                return;
            }

            const element = elements[elementIndex];
            const newElement = element.cloneNode(true);
            section.appendChild(newElement);
            const originalHTML = newElement.innerHTML;
            newElement.innerHTML = '';

            typeHTML(newElement, originalHTML, () => {
                elementIndex++;
                setTimeout(typeNextElement, 500);
            });
        }

        typeNextElement();
    }

    function typePrompt(section, originalSection, callback) {
        const originalPrompt = originalSection.querySelector('.prompt');
        const newPrompt = originalPrompt.cloneNode(true);
        section.appendChild(newPrompt);
        const originalHTML = newPrompt.innerHTML;
        newPrompt.innerHTML = '';

        typeHTML(newPrompt, originalHTML, callback);
    }

    function showJobs(section, originalSection) {
        const jobsElement = originalSection.querySelector('.jobs');
        section.appendChild(jobsElement.cloneNode(true));
    }

    function showProjects(section, originalSection) {
        const projectsList = originalSection.querySelector('ul');
        section.appendChild(projectsList.cloneNode(true));
        setupReadMore(); // Call this after adding the projects content
    }

    function typeHTML(element, html, callback) {
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        let nodes = Array.from(tempDiv.childNodes);
        let currentNodeIndex = 0;
        let currentTextIndex = 0;

        function typeNextChar() {
            if (currentNodeIndex >= nodes.length) {
                callback();
                return;
            }

            let currentNode = nodes[currentNodeIndex];

            if (currentNode.nodeType === Node.TEXT_NODE) {
                if (currentTextIndex < currentNode.length) {
                    element.innerHTML += currentNode.textContent[currentTextIndex];
                    currentTextIndex++;
                    setTimeout(typeNextChar, 20);
                } else {
                    currentNodeIndex++;
                    currentTextIndex = 0;
                    typeNextChar();
                }
            } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
                let newElement = currentNode.cloneNode(true);
                element.appendChild(newElement);
                currentNodeIndex++;
                setTimeout(typeNextChar, 20);
            } else {
                currentNodeIndex++;
                typeNextChar();
            }
        }

        typeNextChar();
    }

    processNextSection();
});


// Your existing 'Read more' functionality
function setupReadMore() {
    var readMoreLinks = document.querySelectorAll('.read-more');
    
    readMoreLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var description = this.nextElementSibling;
            if (description.style.display === 'none') {
                description.style.display = 'block';
                this.textContent = 'Read less...';
            } else {
                description.style.display = 'none';
                this.textContent = 'Read more...';
            }
        });
    });
}