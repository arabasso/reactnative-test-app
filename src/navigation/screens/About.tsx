import { ScrollView } from "react-native";
import { makeStyles, Text } from "@rneui/themed";

export default function About() {
    const styles = useStyles();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>
                Todos os direitos reservados.
            </Text>

            <Text style={styles.header}>
                Versão 0.0.1
            </Text>

            <Text style={styles.paragraph}>
                Nota da tradução: em caso de ação judicial, apenas a versão original em inglês tem valor legal.
            </Text>

            <Text style={styles.paragraph}>
                É concedida permissão, livre de cobrança, a qualquer pessoa que obtenha uma cópia deste software e dos arquivos de documentação associados (o "Software"), para lidar com o Software sem restrição, incluindo sem limitação os direitos de usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender cópias do Software e permitir a pessoas a quem o Software é fornecido para tal, sujeito às seguintes condições:
            </Text>

            <Text style={styles.paragraph}>
                A notificação de copyright acima e esta notificação de permissão deverão ser incluídas em todas as cópias ou porções substanciais do Software
            </Text>

            <Text style={styles.paragraph}>
                O SOFTWARE É FORNECIDO "TAL COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU IMPLÍCITA, INCLUINDO MAS NÃO SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO, CONVENIÊNCIA PARA UM PROPÓSITO ESPECÍFICO E NÃO INFRAÇÃO. EM NENHUMA SITUAÇÃO DEVEM AUTORES(AS) OU TITULARES DE DIREITOS AUTORAIS SEREM RESPONSÁVEIS POR QUALQUER REIVINDICAÇÃO, DANO OU OUTRAS RESPONSABILIDADES, SEJA EM AÇÃO DE CONTRATO, PREJUÍZO OU OUTRA FORMA, DECORRENTE DE, FORA DE OU EM CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS RELAÇÕES COM O SOFTWARE.
            </Text>
        </ScrollView>
    )
};

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    header: {
        marginVertical: theme.spacing.md,
        textAlign: "center",
    },
    paragraph: {
        marginVertical: theme.spacing.md,
        textAlign: "justify",
    },
}));
