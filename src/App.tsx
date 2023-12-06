
import './App.css';
import charactersData from './charactersData';
import {useState} from "react";
interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
}

function App() {
    // Zustand für die aktuelle Seite
    const [currentPage, setCurrentPage] = useState(0);

    // Anzahl der Charaktere pro Seite
    const charactersPerPage = 5;

    // Berechnen des Startindex des aktuellen Datensatzes
    const startIndex = currentPage * charactersPerPage;

    // Ausschneiden der Charaktere für die aktuelle Seite
    const currentCharacters = charactersData.slice(startIndex, startIndex + charactersPerPage);

    // Funktion, um zur nächsten Seite zu navigieren
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    // Funktion, um zur vorherigen Seite zu navigieren
    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
    };

    return (
        <>
            <CharacterTable characters={currentCharacters} />
            <button onClick={prevPage} disabled={currentPage === 0}>Vorherige 5 Charaktere</button>
            <button onClick={nextPage} disabled={startIndex + charactersPerPage >= charactersData.length}>Nächste 5 Charaktere</button>
        </>
    );
}

function CharacterTable({ characters }: { characters: Character[] }) {
    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Species</th>
            </tr>
            </thead>
            <tbody>
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





export default App;
