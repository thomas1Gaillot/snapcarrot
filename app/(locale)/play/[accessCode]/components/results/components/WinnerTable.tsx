import {Result} from "@/domain/result/Result";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const WinnerTable = ({results}: {
    results: Result[]
}) => {
    return (
        <Table className={'py-8'}>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">Rang</TableHead>
                    <TableHead>{"Nom d'utilisateur"}</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {results.map((result) => (
                    <TableRow key={result.id}>
                        <TableCell className="font-medium text-center">{result.rank}</TableCell>
                        <TableCell>{result.user.name}</TableCell>
                        <TableCell className="text-right">{result.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default WinnerTable