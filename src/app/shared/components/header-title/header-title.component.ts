import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { BreadCrumbEs, IBreadCrumb } from 'src/app/core/layout';
import {
  ETypeTitle,
  sModuleName,
  TPath,
  TRoutePattern,
  TTypeTitle,
} from 'src/app/utils';

export const TitleEs: { [key in string/* TPath */]: string } = {
  // ...BreadCrumbEs,
};

@Component({
  selector: 'header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss'],
})
export class HeaderTitleComponent implements OnInit {
  @Input() breadcrumbs: any[] = [];
  @Input() title!: string;
  @Input() titleAdd: string = 'Agregar';
  @Input() className: string = '';
  @Input() redirectLink: TRoutePattern | '' | string = '';
  @Input() module: sModuleName = '';
  @Input() modules!: sModuleName;
  @Input() path!: TPath;

  @Input() hasExportExcel: boolean = false;
  @Input() hasExportPdf: boolean = false;
  @Input() loadExcel: boolean = false;
  @Input() loadPdf: boolean = false;
  @Input() titleExcel: string = 'Exportar Excel';
  @Output('exportExcel') _exportExcel = new EventEmitter();
  @Output('exportPdf') _exportPdf = new EventEmitter();

  @Input('type') typeTitle?: TTypeTitle;
  @Input('code') codeTitle?: TCodeTitle;

  get titleEs() {
    if (this.codeTitle) {
      return `${this.typeTitle ? ETypeTitle[this.typeTitle] : ''} ${
        ECodeTitle[this.codeTitle]
      }`;
    }

    if (this.title) return this.title;

    return TitleEs[this.path] || TitleEs[this.module as unknown as TPath] || '';
  }

  exportExcel() {
    this._exportExcel.emit();
  }

  exportPdf() {
    this._exportPdf.emit();
  }

  constructor() {}

  ngOnInit(): void {}
}

/* TODO: mejorar codigo, por el momento solo es copia */
enum ECodeTitle {
  clothes = 'Ropa',
  activity = 'Actividad',
  workCalendar = 'Aviso/Recordatorio',
  template = 'Plantilla',
  schedule = 'Horario',
  residentTest = 'Test de Residente',
  shopping = 'Lista de compras',
  menu = 'Menu',
  kitchen = 'Cocina',
  ingredient = 'Ingrediente',
  dish = 'Plato',
  tax = 'Impuesto',
  service = 'Servicio',
  /* 'assign-residents' = 'Asignar Residentes',
  'clinical-course' = 'Curso Clinico',
  'daily-living-activities-categories' = 'AVD Categorías',
  'daily-living-activities' = 'AVD',
  'profile-employee' = 'Perfil Empleado',
  'profile-medico' = 'Perfil Medico',
  'user-residents' = 'Usuario Residentes',
  activities = 'Actividades',
  avd = 'AVD',
  centers = 'Centros',
  forecasts = 'Previsiones',
  dashboard = 'Tablero',
  groups = 'Grupos',
  incidents = 'Incidencias',
  kitchens = 'Cocina',
  medications = 'Pauta de Medicación',
  'guideline-medications' = 'Pauta Medicación',
  patient = 'Paciente',
  permission = 'Permisos',
  profile = 'Perfil',
  resident = 'Recidente',
  residents = 'Residentes',
  roles = 'Roles',
  users = 'Usuarios',
  files = 'Archivos',
  shopping = 'Lista de compras',
  'template-managers' = 'Gestor de Plantillas',
  employees = 'Empleados',
  'guideline-diapers' = 'Pauta de Pañales',
  occupations = 'Ocupaciones',
  'answer-questionary' = 'Cuestionario',
  'historical-medications' = 'Historial de Medicación',
  'history-questionary' = 'Historial del Cuestionario',
  'response-questionary' = 'Respuesta del Cuestionario',
  'history-medication' = 'Item Historico Pauta Medica',
  dishes = 'Platos',
  'menu-kitchens' = 'Menu de Platos',
  ingredients = 'Ingredientes',
  avds = 'AVD',
  'resident-avd-detail' = 'Detalle de Registro AVD Residente',
  schedules = 'Horarios',
  calendars = 'Calendario Gastronomico',
  clothes = 'Ropas',
  laundries = 'Lavanderia',
  pharmacies = 'Farmacias',
  'internal-chat' = 'Chat Interno',
  'medical-drugs' = 'Farmacia Medicamentos',
  'cleaning-maintenance' = 'Limpieza y Mantenimiento',
  'reminder-calendars' = 'Calendario de Avisos',
  'drinking-records' = 'Registro de Tomas',
  'drinking-record-expire' = 'Registro de Tomas Vencidas',
  objects = 'Objetos Personales',
  'guideline-feeding' = 'Pauta de Alimentación',
  setting = 'Ajustes y Configuración',
  billings = 'Gestión de Facturacion',
  'personal-objects' = 'Objetos personales',
  contracts = 'Contratos',
  crm = 'Gestión Comercial',
  inspections = 'Inspeccion',
  configuration = 'Configuracion',
  providers = 'Proveedores',
  clients = 'Clientes',
  services = 'Servicios',
  taxes = 'Impuestos',
  payers = 'Clientes - Pagadores',
  'payment-terms' = 'Plazo de terminos',
  'contracts-docs' = 'Contratos y Doc.',
  templates = 'Plantillas',
  settings = 'Configuracion',
  phases = 'Fases',
  'reason-lost' = 'Razones de perdida',
  tags = 'Etiquetas',
  'center-clinical-course' = 'Centro - Curso Clinico',
  purchases = 'Compras',
  history = 'Historial',
  register = 'Registro',
  'sale-rectifies' = 'Factura Ventas Rectificadas',
  'purchase-rectifies' = 'Factura Compras Rectificadas',
  allergies = 'Alergias',
  registers = 'Registros',
  'check-in-out' = 'Registros Verificados',
  tutor = 'Responsable',
  sale = 'Ventas',
  'payment-term' = 'Terminos de Pago',
  configurations = 'Configuracion',
  'resident-tests' = 'Test Residentes',
  'contract-types' = 'Tipos de Contratos', */
}
type TCodeTitle = keyof typeof ECodeTitle;
