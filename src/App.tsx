// Importieren der benötigten React-Hooks und der CSS-Datei
import React, { useState, useEffect } from 'react';
import './App.css';

// Importieren der Charakterdaten
import charactersData from './charactersData';

// Definition der Charakter-Schnittstelle
interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
}

// Hauptkomponente der Anwendung
function App() {
    // Zustandsvariablen für die aktuelle Seite, den Suchbegriff, die gefilterten Charaktere und eventuelle Fehler
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
    const [error, setError] = useState('');
    const charactersPerPage = 5;

    // Filterfunktion, die auf den Suchbegriff reagiert
    useEffect(() => {
        const filtered = charactersData.filter(character =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredCharacters(filtered);
        setCurrentPage(0); // Zurücksetzen der aktuellen Seite bei neuer Suche
        setError(filtered.length === 0 ? 'Kein Charakter mit diesem Namen gefunden.' : '');
    }, [searchTerm]);

    // Bestimmen der Charaktere für die aktuelle Seite
    const currentCharacters = filteredCharacters.slice(
        currentPage * charactersPerPage,
        (currentPage + 1) * charactersPerPage
    );

    // Funktionen zum Wechseln der Seiten
    const nextPage = () => setCurrentPage(prev => prev + 1);
    const prevPage = () => setCurrentPage(prev => (prev > 0 ? prev - 1 : 0));

    // Render-Methode der App-Komponente
    return (
        <>
            <h1>Rick and Morty Characters</h1>
            <input
                type="text"
                placeholder="Suche nach Charakteren"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {error && <div className="error">{error}</div>}
            <CharacterTable characters={currentCharacters} />
            <button onClick={prevPage} disabled={currentPage === 0}>Vorherige 5 Charaktere</button>
            <button onClick={nextPage} disabled={(currentPage + 1) * charactersPerPage >= filteredCharacters.length}>Nächste 5 Charaktere</button>
        </>
    );
}

// Komponente für die Charakter-Tabelle
function CharacterTable({ characters }: { characters: Character[] }) {
    // Render-Methode der CharacterTable-Komponente
    return (
        <table>
            {/* Tabellenkopf */}
            <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Species</th>
            </tr>
            </thead>
            {/* Tabellenkörper */}
            <tbody>
            {/* Iteration über die Charaktere, um Tabellenzeilen zu erzeugen */}
            {characters.map(character => (
                <tr key={character.id}>
                    <td>{character.name}</td>
                    <td>{character.status}</td>
                    <td>{character.species}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

// Export der App-Komponente
export default App;