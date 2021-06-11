import { format } from "date-fns";

function formatDate(str, typeFormat) {
    const date = new Date(str);
    return format(date, typeFormat);
}

export { formatDate };
