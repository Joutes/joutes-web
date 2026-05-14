import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.scss';

export interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  withSearch?: boolean;
  isClearable?: boolean;
  onSelect?: (value: string | undefined) => void;
  defaultValue?: string;
  className?: string;
  variant?: 'default' | 'minimal';
  showLabel?: boolean;
  showArrow?: boolean;
  noResultsText?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Sélectionner...",
  searchPlaceholder = "Rechercher...",
  withSearch = false,
  isClearable = false,
  onSelect,
  defaultValue,
  className = "",
  variant = 'default',
  showLabel = false,
  showArrow = true,
  noResultsText = "Aucun résultat"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
  const [prevDefaultValue, setPrevDefaultValue] = useState<string | undefined>(defaultValue);

  if (defaultValue !== prevDefaultValue) {
    setPrevDefaultValue(defaultValue);
    setSelectedValue(defaultValue);
  }

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === selectedValue);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    setSearchTerm("");
    if (onSelect) {
      onSelect(option.value);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValue(undefined);
    setSearchTerm("");
    if (onSelect) {
      onSelect(undefined);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`custom-select-container ${variant} ${className}`} ref={containerRef}>
      <div className="select-trigger" onClick={handleToggle}>
        <div className={`trigger-text ${showLabel && selectedOption ? 'with-label' : ''}`}>
          {showLabel && selectedOption && (
            <span className="small-label">{placeholder}</span>
          )}
          <div className="value-container">
            {selectedOption?.icon && <span className="option-icon">{selectedOption.icon}</span>}
            <span className={!selectedOption ? 'placeholder' : ''}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
        </div>
        <div className="trigger-actions">
          {isClearable && selectedValue && (
            <span className="clear-btn" onClick={handleClear} title="Effacer la sélection">
              ×
            </span>
          )}
          {showArrow && <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>}
        </div>
      </div>

      {isOpen && (
        <div className="select-dropdown">
          {withSearch && (
            <div className="search-wrapper">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          )}
          <div className="options-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`option-item ${selectedValue === option.value ? 'selected' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option.icon && <span className="option-icon">{option.icon}</span>}
                  <span className="option-label">{option.label}</span>
                </div>
              ))
            ) : (
              <div className="no-results">{noResultsText}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
