import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadCrumbProps } from "@/types";

const CustomBreadcrumb = ({
  parentLabel,
  parentLink,
  currentLabel,
}: BreadCrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={parentLink}
            className="text-[#7dd1e7] hover:text-white transition-colors"
          >
            {parentLabel}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-[#394d9b]" />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-white">{currentLabel}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
