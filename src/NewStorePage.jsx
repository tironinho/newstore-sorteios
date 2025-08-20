// src/NewStorePage.jsx
import * as React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import logoNewStore from './Logo-branca-sem-fundo-768x132.png';
import { SelectionContext } from './selectionContext';
import { useAuth } from './authContext';

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
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

// Imagens locais (substituem links externos)
import imgCardExemplo from './cartaoilustrativoTexto-do-seu-paragrafo-6-1024x1024.png';
import imgTabelaUtilizacao from './Tabela-para-utilizacao-do-3-1024x1024.png';
import imgAcumulo1 from './1-2-1-1024x512.png';
import imgAcumulo2 from './2-1-1-1024x512.png';

// Tema
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#67C23A' },
    secondary: { main: '#FFC107' },
    error: { main: '#D32F2F' },
    background: { default: '#0E0E0E', paper: '#121212' },
    success: { main: '#59b15f' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial'].join(','),
  },
});

// Helpers
const pad2 = (n) => n.toString().padStart(2, '0');

// Link externo (ok manter externo)
const RESULTADOS_LOTERIAS =
  'https://asloterias.com.br/todos-resultados-loteria-federal';

// Mocks
const MOCK_RESERVADOS = [12, 25, 40, 50, 53, 84];
const MOCK_INDISPONIVEIS = [7, 18, 27, 58];

export default function NewStorePage({
  reservados = MOCK_RESERVADOS,
  indisponiveis = MOCK_INDISPONIVEIS,
  onIrParaPagamento,
  // URL do grupo (WhatsApp/Telegram). Substitua abaixo pela sua URL real.
  groupUrl = 'https://wa.me/5599999999999?text=Quero%20participar%20do%20sorteio%20New%20Store',
}) {
  const navigate = useNavigate();
  const { selecionados, setSelecionados, limparSelecao } = React.useContext(SelectionContext);
  const { isAuthenticated, logout } = useAuth();

  // menu avatar
  const [menuEl, setMenuEl] = React.useState(null);
  const menuOpen = Boolean(menuEl);
  const handleOpenMenu = (e) => setMenuEl(e.currentTarget);
  const handleCloseMenu = () => setMenuEl(null);
  const goConta = () => { handleCloseMenu(); navigate('/conta'); };
  const goLogin = () => { handleCloseMenu(); navigate('/login'); };
  const doLogout = () => { handleCloseMenu(); logout(); navigate('/'); };

  // modal (abre só ao clicar em CONTINUAR)
  const [open, setOpen] = React.useState(false);
  const handleAbrirConfirmacao = () => setOpen(true);
  const handleFechar = () => setOpen(false);
  const handleIrPagamento = () => {
    setOpen(false);
    if (onIrParaPagamento) onIrParaPagamento(selecionados);
    else alert(`Ir para pagamento com: ${selecionados.map(pad2).join(', ')}`);
  };

  // cartela
  const isReservado = (n) => reservados.includes(n);
  const isIndisponivel = (n) => indisponiveis.includes(n);
  const isSelecionado = (n) => selecionados.includes(n);
  const handleClickNumero = (n) => {
    if (isIndisponivel(n)) return;
    setSelecionados((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };
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

      {/* Topo */}
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Toolbar sx={{ position: 'relative', minHeight: 64 }}>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
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

          <IconButton color="inherit" sx={{ ml: 'auto' }} onClick={handleOpenMenu}>
            <AccountCircleRoundedIcon />
          </IconButton>
          <Menu
            anchorEl={menuEl}
            open={menuOpen}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {isAuthenticated ? (
              <>
                <MenuItem onClick={goConta}>Área do cliente</MenuItem>
                <Divider />
                <MenuItem onClick={doLogout}>Sair</MenuItem>
              </>
            ) : (
              <MenuItem onClick={goLogin}>Entrar</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Conteúdo */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={4}>
          {/* Texto de boas-vindas */}
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={2}>
              <Typography variant="h3" fontWeight={900}>
                Bem-vindos ao Sorteio da <Box component="span" sx={{ opacity: 0.85 }}>New Store</Box> Relógios!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                O único sorteio que permite receber <strong>100% do valor</strong> de volta em todas as participações. Além de
                concorrer ao prêmio, você tem a <strong>vantagem de não perder o valor investido</strong> — o valor vira um
                <strong> cupom de desconto</strong> para usar no site (validade de até <strong>6 meses</strong>).
              </Typography>
            </Stack>
          </Paper>

          {/* === CARTELA LOGO ABAIXO DO TEXTO === */}
          <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 3 }, bgcolor: 'background.paper' }}>
            {/* Ações e legenda */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={1.5}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                <Chip size="small" label="DISPONÍVEL" sx={{ bgcolor: 'primary.main', color: '#0E0E0E', fontWeight: 700 }} />
                <Chip size="small" label="RESERVADO" sx={{ bgcolor: 'rgba(255,193,7,0.18)', border: '1px solid', borderColor: 'secondary.main', color: 'secondary.main', fontWeight: 700 }} />
                <Chip size="small" label="INDISPONÍVEL" sx={{ bgcolor: 'rgba(211,47,47,0.18)', border: '1px solid', borderColor: 'error.main', color: 'error.main', fontWeight: 700 }} />
                {!!selecionados.length && (
                  <Typography variant="body2" sx={{ ml: 0.5, opacity: 0.8 }}>
                    • {selecionados.length} selecionado(s)
                  </Typography>
                )}
              </Stack>

              <Stack direction="row" spacing={1.5}>
                <Button variant="outlined" color="inherit" disabled={!selecionados.length} onClick={limparSelecao}>
                  LIMPAR SELEÇÃO
                </Button>
                <Button variant="contained" color="success" disabled={!selecionados.length} onClick={handleAbrirConfirmacao}>
                  CONTINUAR
                </Button>
              </Stack>
            </Stack>

            {/* Grid 10x10 — dimensões preservadas */}
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
          {/* === FIM CARTELA === */}

          {/* Demais seções (abaixo da cartela) */}
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={1.5}>
              <Typography sx={{ color: '#ff6b6b', fontWeight: 800, letterSpacing: 0.5 }}>
                imagem ilustrativa do cartão presente
              </Typography>
              <Box
                component="img"
                src={imgCardExemplo}
                alt="Cartão presente - exemplo"
                sx={{ width: '100%', maxWidth: 800, mx: 'auto', display: 'block', borderRadius: 2 }}
              />
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Os cartões são <strong>acumulativos</strong>, permitindo somar até <strong>R$ 4.200</strong> em um único cartão.
              </Typography>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={1.2}>
              <Typography variant="h6" fontWeight={800}>
                Informações do sorteio
              </Typography>
              <Typography variant="body1">• A posição só é considerada <strong>confirmada</strong> após a compensação do pagamento pelo número reservado.</Typography>
              <Typography variant="body1">• O sorteio é realizado <strong>após a venda de todos os cartões</strong>.</Typography>
              <Typography variant="body1">
                • O resultado utiliza a <strong>Lotomania</strong> — veja em{' '}
                <Link href={RESULTADOS_LOTERIAS} target="_blank" rel="noopener">Resultados das loterias</Link>.
              </Typography>
              <Typography variant="body1">• O <strong>ganhador</strong> é aquele que tirar o <strong>último número</strong> sorteado da Lotomania.</Typography>
              <Typography variant="body1">• Custos de entrega por conta do vencedor; envio a partir do RJ.</Typography>
              <Typography variant="body1">• Duração máxima do sorteio: <strong>7 dias</strong>.</Typography>
              <Typography variant="body1">• O <strong>Cartão Presente não é cumulativo</strong> com o prêmio do sorteio.</Typography>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={900}>
                Regras para utilização dos <Box component="span" sx={{ opacity: 0.85 }}>cartões presente</Box>
              </Typography>
              <Stack component="ul" sx={{ pl: 3, m: 0 }} spacing={1}>
                <Typography component="li">Uso apenas no site da New Store.</Typography>
                <Typography component="li">Não é possível comprar outro cartão-presente com cartão-presente.</Typography>
                <Typography component="li">Não há conversão em dinheiro.</Typography>
                <Typography component="li">Utilização em <strong>uma única compra</strong> (pode dividir em vários cartões).</Typography>
                <Typography component="li">Validade: <strong>6 meses</strong>.</Typography>
                <Typography component="li">Sem responsabilidade por extravio/furto/perda/validade expirada.</Typography>
                <Typography component="li">Considerar o <strong>valor cheio do produto</strong> (tabela abaixo).</Typography>
                <Typography component="li">Não soma com outros cupons.</Typography>
              </Stack>
              <Box
                component="img"
                src={imgTabelaUtilizacao}
                alt="Tabela para utilização do cartão presente"
                sx={{ width: '100%', maxWidth: 900, mx: 'auto', display: 'block', borderRadius: 2, mt: 1 }}
              />
              <Typography align="center" sx={{ mt: 1.5, fontWeight: 700, letterSpacing: 1 }}>
                CONSIDERAR O VALOR CHEIO DO PRODUTO
              </Typography>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={1.5}>
              <Typography>
                Dica: ao <strong>juntar cartões</strong>, a validade passa a ser a do cartão <strong>mais recente</strong>.
              </Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" sx={{ mt: 1 }}>
                <Box component="img" src={imgAcumulo1} alt="Exemplo de acúmulo 1" sx={{ width: '100%', maxWidth: 560, borderRadius: 2 }} />
                <Box component="img" src={imgAcumulo2} alt="Exemplo de acúmulo 2" sx={{ width: '100%', maxWidth: 560, borderRadius: 2 }} />
              </Stack>
            </Stack>
          </Paper>

          {/* === NOVA SEÇÃO: CONVITE PARA O GRUPO === */}
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 3, md: 4 },
              textAlign: 'center',
              bgcolor: 'rgba(103, 194, 58, 0.05)',
              borderColor: 'primary.main',
            }}
          >
            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>
              Clique no link abaixo e faça parte do <br /> grupo do sorteio!
            </Typography>
            <Typography sx={{ opacity: 0.85, mb: 2 }}>
              Lá você acompanha novidades, abertura de novas rodadas e avisos importantes.
            </Typography>
            <Button
              component="a"
              href={groupUrl}
              target="_blank"
              rel="noopener"
              size="large"
              variant="contained"
              color="success"
              sx={{ px: 4, py: 1.5, fontWeight: 800, letterSpacing: 0.5 }}
            >
              SIM, EU QUERO PARTICIPAR!
            </Button>
          </Paper>
        </Stack>
      </Container>

      {/* Modal de confirmação */}
      <Dialog open={open} onClose={handleFechar} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontSize: 22, fontWeight: 800, textAlign: 'center' }}>
          Confirme sua seleção
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          {selecionados.length ? (
            <>
              <Typography variant="body2" sx={{ opacity: 0.85, mb: 1 }}>
                Você selecionou {selecionados.length}{' '}
                {selecionados.length === 1 ? 'número' : 'números'}:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1, mb: 1 }}>
                {selecionados.slice().sort((a, b) => a - b).map(pad2).join(', ')}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Você pode voltar e ajustar a seleção, se quiser.
              </Typography>
            </>
          ) : (
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Nenhum número selecionado.
            </Typography>
          )}
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
          <Button
            variant="outlined"
            color="error"
            onClick={() => { limparSelecao(); setOpen(false); }}
            disabled={!selecionados.length}
            sx={{ py: 1.2, fontWeight: 700 }}
          >
            LIMPAR SELEÇÃO
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleIrPagamento}
            disabled={!selecionados.length}
            sx={{ py: 1.2, fontWeight: 700 }}
          >
            IR PARA PAGAMENTO
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
