// src/AccountPage.jsx
import * as React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import logoNewStore from './Logo-branca-sem-fundo-768x132.png';
import { SelectionContext } from './selectionContext';

import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  IconButton,
  Paper,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

// === Tema consistente com a Home ===
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#67C23A' },
    secondary: { main: '#FFC107' },
    error: { main: '#D32F2F' },
    background: { default: '#0E0E0E', paper: '#121212' },
    success: { main: '#2E7D32' },
    warning: { main: '#B58900' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial'].join(','),
  },
});

const pad2 = (n) => n.toString().padStart(2, '0');

// MOCK – histórico de sorteios (dd/mm/aaaa)
const MOCK_HISTORY = [
  { numero: 98, data: '04/02/2024', status: 'CONTEMPLADO' },
  { numero: 97, data: '21/03/2024', status: 'NÃO CONTEMPLADO' },
  { numero: 86, data: '28/01/2024', status: 'NÃO CONTEMPLADO' },
  { numero: 85, data: '27/01/2024', status: 'NÃO CONTEMPLADO' },
  { numero: 84, data: '04/03/2024', status: 'NÃO CONTEMPLADO' },
  { numero: 83, data: '08/03/2024', status: 'NÃO CONTEMPLADO' },
  { numero: 82, data: '10/03/2024', status: 'PENDENTE' }, // <- este virá em primeiro
  { numero: 81, data: '29/02/2024', status: 'NÃO CONTEMPLADO' },
  { numero: 80, data: '28/02/2024', status: 'NÃO CONTEMPLADO' },
];

const StatusChip = ({ status }) => {
  if (status === 'CONTEMPLADO') {
    return (
      <Chip
        label="CONTEMPLADO"
        sx={{ bgcolor: 'success.main', color: '#fff', fontWeight: 800, borderRadius: 999, px: 1.5 }}
      />
    );
  }
  if (status === 'PENDENTE') {
    return (
      <Chip
        label="PENDENTE"
        sx={{ bgcolor: 'warning.main', color: '#000', fontWeight: 800, borderRadius: 999, px: 1.5 }}
      />
    );
  }
  return (
    <Chip
      label="NÃO CONTEMPLADO"
      sx={{ bgcolor: 'error.main', color: '#fff', fontWeight: 800, borderRadius: 999, px: 1.5 }}
    />
  );
};

// util para ordenar pendentes primeiro
const sortPendingFirst = (rows) => {
  return rows.slice().sort((a, b) => {
    const aP = a.status === 'PENDENTE';
    const bP = b.status === 'PENDENTE';
    if (aP && !bP) return -1;
    if (!aP && bP) return 1;
    return 0; // mantém a ordem original entre os demais
  });
};

export default function AccountPage() {
  const navigate = useNavigate();
  const { selecionados, limparSelecao } = React.useContext(SelectionContext);

  // MOCK do cartão (usa seleção se existir)
  const cliente = {
    nome: 'NOME DO CLIENTE',
    cupom: 'CUPOMAQUI',
    valorAcumulado: 65.0,
    validade: '28/10/25',
    posicoes:
      selecionados.length > 0
        ? selecionados.slice(0, 6).map(pad2)
        : ['05', '12', '27', '33', '44', '59'],
    premio: 'VOUCHER DE X EM COMPRAS NO SITE',
  };

  const history = React.useMemo(() => sortPendingFirst(MOCK_HISTORY), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Topo com logo e voltar */}
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Toolbar sx={{ position: 'relative', minHeight: 64 }}>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)} aria-label="Voltar">
            <ArrowBackIosNewRoundedIcon />
          </IconButton>

          <Box
            component={RouterLink}
            to="/"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box component="img" src={logoNewStore} alt="NEW STORE" sx={{ height: 40, objectFit: 'contain' }} />
          </Box>

          <IconButton color="inherit" sx={{ ml: 'auto' }}>
            <AccountCircleRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Conteúdo */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={3}>
          {/* Título (desktop) */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              letterSpacing: 1,
              textTransform: 'uppercase',
              display: { xs: 'none', md: 'block' },
              opacity: 0.9,
            }}
          >
            NOME DO CLIENTE
          </Typography>

          {/* ===== CARTÃO com tamanho de cartão (menor) ===== */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Paper
              elevation={0}
              sx={{
                width: { xs: 'min(92vw, 320px)', sm: 'min(88vw, 400px)', md: '440px' },
                aspectRatio: '1.586 / 1',      // largura/altura
                borderRadius: 5,               // cantos bem arredondados
                position: 'relative',
                overflow: 'hidden',
                p: { xs: 1.5, sm: 2, md: 2.2 }, // padding reduzido
                bgcolor: '#181818',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundImage: `
                  radial-gradient(70% 120% at 35% 65%, rgba(255,255,255,0.20), transparent 60%),
                  radial-gradient(60% 120% at 80% 20%, rgba(255,255,255,0.10), transparent 60%),
                  radial-gradient(100% 140% at -10% 120%, rgba(0,0,0,0.45), transparent 60%)
                `,
                backgroundBlendMode: 'screen, lighten, normal',
              }}
            >
              {/* ruído sutil */}
              <Box
                sx={{
                  pointerEvents: 'none',
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.08,
                  backgroundImage:
                    'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)',
                  backgroundSize: '3px 3px, 5px 5px',
                  backgroundPosition: '0 0, 10px 5px',
                }}
              />

              {/* Conteúdo do cartão */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                gap={1}
                sx={{ position: 'relative', height: '100%' }}
              >
                {/* ESQUERDA */}
                <Stack spacing={0.8} flex={1} minWidth={0}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily:
                          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        letterSpacing: 1,
                        opacity: 0.85,
                        display: 'block',
                      }}
                    >
                      PRÊMIO: {cliente.premio}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily:
                          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        letterSpacing: 1,
                        opacity: 0.85,
                        display: 'block',
                      }}
                    >
                      CARTÃO PRESENTE
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily:
                          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        letterSpacing: 1,
                        opacity: 0.85,
                        display: 'block',
                      }}
                    >
                      POSIÇÕES: {cliente.posicoes.join(', ')}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 'auto' }}>
                    <Box component="img" src={logoNewStore} alt="NS" sx={{ height: 18, opacity: 0.9 }} />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 900,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        lineHeight: 1.1,
                      }}
                    >
                      {cliente.nome}
                    </Typography>
                  </Stack>

                  <Stack spacing={0.1} sx={{ mt: 'auto' }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily:
                          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        letterSpacing: 1,
                        opacity: 0.75,
                      }}
                    >
                      VÁLIDO ATÉ
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      {cliente.validade}
                    </Typography>
                  </Stack>
                </Stack>

                {/* DIREITA */}
                <Stack spacing={0.4} alignItems="flex-end" sx={{ ml: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily:
                        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      letterSpacing: 1,
                      opacity: 0.85,
                    }}
                  >
                    CÓDIGO DE DESCONTO:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 900, letterSpacing: 2, lineHeight: 1 }}
                  >
                    {cliente.cupom}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily:
                        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      letterSpacing: 1,
                      opacity: 0.9,
                      color: '#9AE6B4',
                      textAlign: 'right',
                    }}
                  >
                    VALOR ACUMULADO:
                  </Typography>
                  <Typography sx={{ fontWeight: 900, color: '#9AE6B4' }}>
                    R$ {cliente.valorAcumulado.toFixed(2).replace('.', ',')}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Box>

          {/* Histórico (PENDENTE primeiro) */}
          <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 } }}>
            <TableContainer>
              <Table size="medium" sx={{ minWidth: 560 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800 }}>SORTEIO</TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>DIA</TableCell>
                    <TableCell sx={{ fontWeight: 800 }}>RESULTADO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((row) => (
                    <TableRow key={`${row.numero}-${row.data}`} hover>
                      <TableCell sx={{ width: 120, fontWeight: 700 }}>{pad2(row.numero)}</TableCell>
                      <TableCell sx={{ width: 180 }}>{row.data}</TableCell>
                      <TableCell><StatusChip status={row.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack direction="row" justifyContent="flex-end" gap={1.5} sx={{ mt: 2 }}>
              <Button variant="outlined" color="error" onClick={limparSelecao}>
                Limpar meus números
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => alert('Resgatar cupom: ' + cliente.cupom)}
              >
                Resgatar cupom
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
