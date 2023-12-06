
import './App.css';
import charactersData from './charactersData';
interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
}

function App() {

    return (
        <>
            <h1>Rick and Morty Characters</h1>
            <CharacterTable characters={charactersData} />
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
