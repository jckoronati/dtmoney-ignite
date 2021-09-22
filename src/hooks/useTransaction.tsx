import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    category: string;
    type: string;
    createdAt: string;
}

/* 
    A sintase pode ser  aplicada com a propriedade pick, que ao inves de passar os valores omitidos,
    deve retornar apenas os que serão usados na construção do objeto Pick<title, amount, category, type, createdAt>
*/
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext  = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput, 
            createdAt: new Date()
        });
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return(
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}