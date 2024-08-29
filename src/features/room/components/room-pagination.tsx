import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface IPagination {
  page: number;
  totalPage: number;
  limit: number;
  next?: number;
  prev?: number;
}

interface PaginationProps {
  pagination: IPagination;
  handlePageChange: (newPage: number) => void;
}

export default function RoomPagination({
  pagination,
  handlePageChange,
}: PaginationProps) {
  return (
    <div>
      <Pagination className="my-12 flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              <div className="flex items-center justify-center">
                <ChevronLeft className=" h-5 w-5" />
                <div>Previous</div>
              </div>
            </Button>
          </PaginationItem>
          {pagination.prev && (
            <PaginationItem>
              <Button
                onClick={() => handlePageChange(pagination.prev ?? 0)}
                variant="ghost"
                size="icon"
              >
                {pagination.prev}
              </Button>
            </PaginationItem>
          )}
          <PaginationItem>
            <Button size="sm">{pagination.page}</Button>
          </PaginationItem>
          {pagination.next && (
            <PaginationItem>
              <Button
                onClick={() => handlePageChange(pagination.next ?? 0)}
                variant="ghost"
                size="icon"
              >
                {pagination.next}
              </Button>
            </PaginationItem>
          )}
          {(pagination.totalPage ?? 1) > 1 &&
            pagination.page + 1 < (pagination.totalPage ?? 1) && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          <PaginationItem>
            <Button
              onClick={() => handlePageChange(pagination.totalPage ?? 1)}
              variant="ghost"
              size="icon"
              className={cn(
                pagination.totalPage === pagination.page ||
                  pagination.totalPage === pagination.page + 1
                  ? "hidden"
                  : ""
              )}
            >
              {pagination.totalPage}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPage}
            >
              <div className="flex items-center justify-center">
                <div>Next</div>
                <ChevronRight className=" h-5 w-5" />
              </div>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
