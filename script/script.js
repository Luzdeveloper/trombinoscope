 // Initialiser la carte
        const map = L.map('map').setView([50.7254, 1.6145], 10);

        // Ajouter une couche de tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Charger le fichier JSON
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Ajouter des marqueurs pour chaque élément
                data.forEach(element => {
                    const { latitude, longitude } = element.coordinates;
                    const marker = L.marker([latitude, longitude]).addTo(map);

                    // Créer le contenu de la popup
                    const popupContent = `
                        <strong>${element.name}</strong><br>
                        Location: ${element.location}<br>
                        Skills: ${element.skills.join(', ')}<br>
                        Hobbies: ${element.hobbies.join(', ')}<br>
                        Quote: "${element.quote}"<br>
                        ${element.links.github ? `<a href="${element.links.github}" target="_blank">GitHub</a><br>` : ''}
                        ${element.links.linkedin ? `<a href="${element.links.linkedin}" target="_blank">LinkedIn</a><br>` : ''}
                        ${element.links.youtube ? `<a href="${element.links.youtube}" target="_blank">YouTube</a><br>` : ''}
                        ${element.links.twitch ? `<a href="${element.links.twitch}" target="_blank">Twitch</a><br>` : ''}
                    `;

                    // Ajouter la popup au marqueur
                    marker.bindPopup(popupContent);
                });
            })
            .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
