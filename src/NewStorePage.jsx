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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Paper,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

// === THEME (dark) ===
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#67C23A' }, // disponível
    secondary: { main: '#FFC107' }, // reservado
    error: { main: '#D32F2F' },     // indisponível
    background: { default: '#0E0E0E', paper: '#121212' },
    success: { main: '#59b15f' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial'].join(','),
  },
});

// util: 2 dígitos
const pad2 = (n) => n.toString().padStart(2, '0');

// MOCKS (troque por dados do backend)
const MOCK_RESERVADOS = [12, 25, 40, 50, 53, 84];
const MOCK_INDISPONIVEIS = [7, 18, 27, 58];

export default function NewStorePage({
  reservados = MOCK_RESERVADOS,
  indisponiveis = MOCK_INDISPONIVEIS,
  onIrParaPagamento,
}) {
  const navigate = useNavigate();
  const { selecionados, setSelecionados, limparSelecao } = React.useContext(SelectionContext);
  const [open, setOpen] = React.useState(false);
  const [ultimoNumero, setUltimoNumero] = React.useState(null);

  const isReservado = (n) => reservados.includes(n);
  const isIndisponivel = (n) => indisponiveis.includes(n);
  const isSelecionado = (n) => selecionados.includes(n);

  const handleClickNumero = (n) => {
    if (isIndisponivel(n)) return;
    setUltimoNumero(n);
    setSelecionados((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
    setOpen(true);
  };

  const handleFechar = () => setOpen(false);

  const handleIrPagamento = () => {
    setOpen(false);
    if (onIrParaPagamento) onIrParaPagamento(selecionados);
    else alert(`Ir para pagamento com: ${selecionados.map(pad2).join(', ')}`);
  };

  // estilos por estado
  const getCellSx = (n) => {
    if (isIndisponivel(n)) {
      return {
        border: '2px solid',
        borderColor: 'error.main',
        bgcolor: 'rgba(211,47,47,0.15)',
        color: 'grey.300',
        cursor: 'not-allowed',
        opacity: 0.85,
      };
    }
    if (isSelecionado(n) || isReservado(n)) {
      return {
        border: '2px solid',
        borderColor: 'secondary.main',
        bgcolor: 'rgba(255,193,7,0.12)',
      };
    }
    return {
      border: '2px solid rgba(255,255,255,0.08)',
      bgcolor: 'primary.main',
      color: '#0E0E0E',
      '&:hover': { filter: 'brightness(0.95)' },
      transition: 'filter 120ms ease',
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* TOP BAR (logo centralizado) */}
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Toolbar sx={{ position: 'relative', minHeight: 64 }}>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>

          {/* Logo central absoluto (linka para home) */}
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

          {/* Avatar -> vai para /conta */}
          <IconButton color="inherit" sx={{ ml: 'auto' }} onClick={() => navigate('/conta')} aria-label="Área do cliente">
            <AccountCircleRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* CONTEÚDO */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight={800}>
            Bem-vindos ao Sorteio da <Box component="span" sx={{ opacity: 0.85 }}>New Store</Box> Relógios!
          </Typography>

          {/* Legenda */}
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            <Chip size="small" label="DISPONÍVEL" sx={{ bgcolor: 'primary.main', color: '#0E0E0E', fontWeight: 700 }} />
            <Chip size="small" label="RESERVADO" sx={{ bgcolor: 'rgba(255,193,7,0.18)', border: '1px solid', borderColor: 'secondary.main', color: 'secondary.main', fontWeight: 700 }} />
            <Chip size="small" label="INDISPONÍVEL" sx={{ bgcolor: 'rgba(211,47,47,0.18)', border: '1px solid', borderColor: 'error.main', color: 'error.main', fontWeight: 700 }} />
            {!!selecionados.length && (
              <Typography variant="body2" sx={{ ml: 1, opacity: 0.8 }}>
                • {selecionados.length} selecionado(s)
              </Typography>
            )}
          </Stack>

          {/* CARTELA 10×10 QUADRADA (100% responsiva, sem sumir no mobile) */}
          <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 3 }, bgcolor: 'background.paper' }}>
            <Box
              sx={{
                width: { xs: 'calc(100vw - 32px)', sm: 'calc(100vw - 64px)', md: '100%' },
                maxWidth: 640,
                aspectRatio: '1 / 1',
                mx: 'auto',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(10, minmax(0, 1fr))',
                  gridTemplateRows: 'repeat(10, minmax(0, 1fr))',
                  gap: { xs: 1, md: 1.2 },
                  height: '100%',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {Array.from({ length: 100 }).map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => handleClickNumero(idx)}
                    sx={{
                      ...getCellSx(idx),
                      borderRadius: 1.2,
                      userSelect: 'none',
                      cursor: isIndisponivel(idx) ? 'not-allowed' : 'pointer',
                      aspectRatio: '1 / 1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {pad2(idx)}
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Stack>
      </Container>

      {/* MODAL */}
      <Dialog open={open} onClose={handleFechar} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontSize: 22, fontWeight: 800, textAlign: 'center' }}>
          Você selecionou o número{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            {ultimoNumero !== null ? pad2(ultimoNumero) : '--'}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Se quiser, continue escolhendo outros números antes de pagar.
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1.5, opacity: 0.8 }}>
            {selecionados.length ? `Selecionados: ${selecionados.map(pad2).join(', ')}` : 'Nenhum número selecionado'}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3, pb: 3, gap: 1.2,
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', sm: 'row' },
            '& > *': { flex: 1 },
          }}
        >
          <Button variant="outlined" onClick={handleFechar} sx={{ py: 1.2, fontWeight: 700 }}>
            SELECIONAR MAIS NÚMEROS
          </Button>
          <Button variant="outlined" color="error" onClick={limparSelecao} disabled={!selecionados.length} sx={{ py: 1.2, fontWeight: 700 }}>
            LIMPAR SELEÇÃO
          </Button>
          <Button variant="contained" color="success" onClick={handleIrPagamento} disabled={!selecionados.length} sx={{ py: 1.2, fontWeight: 700 }}>
            IR PARA PAGAMENTO
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
