// Importieren von notwendigen Abhängigkeiten aus 'react'
import './App.css';  // Importieren der CSS-Datei für Styling
import initialCharactersData from './charactersData'; // Importieren der Charakterdaten
import { useState, useEffect } from 'react'; // Importieren von Hooks aus React

// Definition der Character-Schnittstelle
interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
}

// Definition der Hauptkomponente 'App'
function App() {
    // State für die Charakterdaten, initial leer
    const [charactersData, setCharactersData] = useState<Character[]>([]);
    // State für die aktuelle Seite in der Paginierung, initial auf 0
    const [currentPage, setCurrentPage] = useState(0);

    // Konstante für die Anzahl der Charaktere pro Seite
    const charactersPerPage = 5;
    // Berechnung des Startindex für die aktuelle Seite
    const startIndex = currentPage * charactersPerPage;

    // useEffect-Hook, um die Charakterdaten beim ersten Render-Vorgang zu laden
    useEffect(() => {
        // Setzen der initial geladenen Charakterdaten in den State
        setCharactersData(initialCharactersData);
    }, []);

    // Bestimmung der Charaktere, die auf der aktuellen Seite angezeigt werden
    const currentCharacters = charactersData.slice(startIndex, startIndex + charactersPerPage);

    // Funktion, um zur nächsten Seite zu navigieren
    const nextPage = () => {
        // Aktualisieren des currentPage-State um eins nach oben
        setCurrentPage((prevPage) => prevPage + 1);
    };

    // Funktion, um zur vorherigen Seite zu navigieren
    const prevPage = () => {
        // Aktualisieren des currentPage-State um eins nach unten, aber nicht kleiner als 0
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
    };

    // Render-Methode der App-Komponente
    return (
        <>
            <h1>Rick and Morty Characters</h1> {/* Überschrift */}
            {/* Charakter-Tabelle mit den aktuellen Charakteren */}
            <CharacterTable characters={currentCharacters} />
            {/* Button, um zur vorherigen Seite zu navigieren */}
            <button onClick={prevPage} disabled={currentPage === 0}>Vorherige 5 Charaktere</button>
            {/* Button, um zur nächsten Seite zu navigieren */}
            <button onClick={nextPage} disabled={startIndex + charactersPerPage >= charactersData.length}>Nächste 5 Charaktere</button>
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
