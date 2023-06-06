// assets
import { IconTypography, IconCloud, IconSignal5g, IconBriefcase } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconCloud,
  IconSignal5g,
  IconBriefcase
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Cursos disponíveis',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'IA - Inteligência Artificial',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Cloud',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconCloud,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: '5G',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconSignal5g,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'Empreendedorismo Espacial',
      type: 'collapse',
      icon: icons.IconBriefcase,
      children: [
        {
          id: 'tabler-icons',
          title: 'Tabler Icons',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'material-icons',
          title: 'Material Icons',
          type: 'item',
          external: true,
          target: '_blank',
          url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
