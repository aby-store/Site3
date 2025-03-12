        let selectedItems = [];
        let selectedGame = "";

        // Game selection
        document.querySelectorAll('.game-item').forEach(item => {
            item.addEventListener('click', () => {
                selectedGame = item.dataset.game;
                document.querySelectorAll('.game-item').forEach(i => i.style.backgroundColor = '#333');
                item.style.backgroundColor = '#4CAF50';
                updateSelectedItems();
            });
        });

        // Item selection
        document.querySelectorAll('.item-button').forEach(button => {
            button.addEventListener('click', () => {
                const item = {
                    game: selectedGame,
                    price: button.dataset.price,
                    text: button.textContent
                };
                
                if(!selectedGame) return alert('Pilih game terlebih dahulu!');
                
                selectedItems.push(item);
                updateSelectedItems();
            });
        });

        // Update selected items display
        function updateSelectedItems() {
            const itemsDiv = document.getElementById('selected-items');
            itemsDiv.innerHTML = '<h4>Item Dipilih:</h4>';
            
            selectedItems.forEach((item, index) => {
                itemsDiv.innerHTML += `
                    <p>${item.game} - ${item.text}</p>
                `;
            });
        }

        // WhatsApp Checkout
        ddocument.getElementById('whatsapp-button').addEventListener('click', () => {
            const playerId = document.getElementById('player-id').value;
            if(!playerId) return alert('Masukkan ID Player!');
            if(selectedItems.length === 0) return alert('Pilih item terlebih dahulu!');

            const total = selectedItems.reduce((sum, item) => sum + parseInt(item.price), 0);
            
            const message = `Halo min, saya ingin topup:\n${selectedItems.map(item => 
                `- ${item.game} (${item.text})`).join('\n')}\n\nTotal: Rp ${total * 2},000\nID Player: ${playerId}`;

            const whatsappUrl = `https://wa.me/6285607827911?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });