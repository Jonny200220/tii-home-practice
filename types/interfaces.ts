export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: any;
  color: string;           // El color fuerte del icono (ej: Azul)
  backgroundColor: string; // El color suave del fondo del icono (ej: Azul clarito)
}

export interface StatItem {
    title: string;
    value: string;
    iconName: any;
    iconColor: string;
}