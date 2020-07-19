import { useTranslation } from 'react-i18next';
export default function I18n(dn){
    const { t } = useTranslation();
    return t(dn);
}