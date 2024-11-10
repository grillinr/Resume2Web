import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface TagListProps {
  initialTags?: string[]; // Optional prop for initial tags
  tagName: string;
  onChange: (tags: string[]) => void;
}

const TagList: React.FC<TagListProps> = ({ initialTags = [], tagName }) => {
    const [tags, setTags] = useState<string[]>(initialTags); // List of tags, initialized with initialTags prop
    const [input, setInput] = useState<string>(''); // Current input value

    // Function to add a tag to the list
    const addTag = (): void => {
        const trimmedInput = input.trim();
        if (trimmedInput && !tags.includes(trimmedInput)) { // Avoid duplicates and empty entries
            setTags([...tags, trimmedInput]);
            setInput(''); // Clear input field after adding
        }
    };

    // Function to remove a tag from the list
    const removeTag = (tagToRemove: string): void => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    // Handle input field changes
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setInput(event.target.value);
    };

    // Handle key press (e.g., "Enter")
    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTag();
        }
    };

    return (
        <div className="tag-list-container">
            <div className="input-wrapper">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder={`Add ${tagName}`}
                />
                <button onClick={addTag}>
                    Add {tagName}
                </button>
            </div>
            <div className="tags-display">
                {tags.map((tag, index) => (
                    <div key={index} className="tag">
                        <span>{tag}</span>
                        <span
                            className="remove-tag"
                            onClick={() => removeTag(tag)}
                        >
                            ✕
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagList;
