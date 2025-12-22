// navbar.config.ts
export interface NavbarConfig {
  titulo: string;
  links: {
    label: string;
    route: string;
  }[];
}

export const NAVBAR_CONFIG: Record<string, NavbarConfig> = {
  principal: {
    titulo: 'SISTEMA DE GESTION - DTI',
    links: []
  },

  correos: {
    titulo: 'PANEL DE CORREOS POLICIALES Y SISTEMAS NACIONALES',
    links: [
      { label: 'Usuarios', route: '/pages/lst_usuario' },
      { label: 'Solicitantes', route: '/pages/lst_usuario_solicitante' },
      { label: 'Correo Institucional', route: '/pages/lst_correos_institucionales' },
      { label: 'Sistemas Federales', route: '/pages/lst_plataforma' },
      { label: 'Reclamos', route: '/pages/lst_reclamos' }
    ]
  },

  sistemas: {
    titulo: 'SISTEMAS INTERNOS',
    links: [
      { label: 'Usuarios', route: '/pages/lst_usuario' }
    ]
  }
};
