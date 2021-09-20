import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionTable() {
    useEffect(() => {
        api.get('transactions')
            .then(response => console.log(response.data));
    }, []);

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>
                            Titulo
                        </th>
                        <th>
                            Valor
                        </th>
                        <th>
                            Categria
                        </th>
                        <th>
                            Data
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Desenvolvimento de wewbsite
                        </td>
                        <td className="deposit">
                            R$12800
                        </td>
                        <td>
                            Serviços
                        </td>
                        <td>
                            20/02/2021
                        </td>
                    </tr>
                    <tr>
                        <td>                    
                            Aluguel
                        </td>
                        <td className="withdraw">
                            - R$1150
                        </td>
                        <td>
                            Casa
                        </td>
                        <td>
                            17/02/2021
                        </td>
                    </tr>
                </tbody>
            </table>
        </Container>
    );
}