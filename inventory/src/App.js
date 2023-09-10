import React from 'react';

class App extends React.Component {
    state = {
        items: [
            { id: 1, name: 'Pistol', image: 'pistol.png' },
            { id: 2, name: 'Joint', image: 'joint.png' },
            { id: 3, name: 'Mask', image: 'mask.png' },
            { id: 4, name: 'Milk', image: 'milk.png' },
            { id: 5, name: 'Bat', image: 'bat.png' }
        ],
        droppedItems: []
    };

    handleDragStart = (event, id, source) => {
        event.dataTransfer.setData('text/plain', JSON.stringify({ id, source }));
    };

    handleDrop = (event, target) => {
        event.preventDefault();
        const { items, droppedItems } = this.state;
        const { id, source } = JSON.parse(event.dataTransfer.getData('text/plain'));
        const item = source === 'items' ? items.find((item) => item.id === id) : droppedItems.find((item) => item.id === id);

        if (source === 'items') {
            const updatedItems = items.filter((item) => item.id !== id);
            this.setState({
                items: updatedItems,
                droppedItems: [...droppedItems, item]
            });
        } else {
            const updatedDroppedItems = droppedItems.filter((item) => item.id !== id);
            this.setState({
                items: [...items, item],
                droppedItems: updatedDroppedItems
            });
        }
    };

    handleDragOver = (event) => {
        event.preventDefault();
    };

    render() {
        const { items, droppedItems } = this.state;

        const inventoryItems = document.querySelectorAll('.inventory-item');

        inventoryItems.forEach(item => {
            item.addEventListener('mouseover', () => {
                // Add 'selected' class to the item
                item.classList.add('selected');
            });

            item.addEventListener('mouseout', () => {
                // Remove 'selected' class from item
                item.classList.remove('selected');
            });
        });

        return (
            <div>
                <h1>Inventory</h1>

{/*                 <div className="dropzone" onDrop={(event) => this.handleDrop(event, 'dropzone')} onDragOver={this.handleDragOver}>
                    {droppedItems.map((item) => (
                        <div
                            key={item.id}
                            className="draggable"
                            draggable="true"
                            onDragStart={(event) => this.handleDragStart(event, item.id, 'droppedItems')}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>

                <div>
                    {items.map((item) => (
                        <div
                        key={item.id}
                        className="draggable"
                        draggable="true"
                        onDragStart={(event) => this.handleDragStart(event, item.id, 'items')}
                        >
                        {item.name}
                        </div>
                    ))}
                </div> */}
            </div>
        );
    }
}

export default App;