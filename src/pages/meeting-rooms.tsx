import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useGetRoomsQuery } from "@/features/room/roomApi";
import RoomPagination from "@/features/room/components/room-pagination";
import RoomCard from "@/features/room/components/room-card";

export default function MeetingRooms() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    searchTerm: "",
    min_price: "",
    max_price: "",
    min_capacity: "",
    max_capacity: "",
    sort_by: "",
  });

  const currentPage = Number(searchParams.get("page") || 1);
  const searchTerm = searchParams.get("searchTerm") || "";
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const minCapacity = searchParams.get("min_capacity");
  const maxCapacity = searchParams.get("max_capacity");
  const sort = searchParams.get("sort_by") || "";

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);
  const [debouncedMinCapacity, setDebouncedMinCapacity] = useState(minCapacity);
  const [debouncedMaxCapacity, setDebouncedMaxCapacity] = useState(maxCapacity);

  const [filterValues, setFilterValues] = useState({
    searchTerm: searchTerm,
    minPrice: minPrice || "",
    maxPrice: maxPrice || "",
    minCapacity: minCapacity || "",
    maxCapacity: maxCapacity || "",
    sort: sort,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
      setDebouncedMinCapacity(minCapacity);
      setDebouncedMaxCapacity(maxCapacity);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, minPrice, maxPrice, minCapacity, maxCapacity]);

  const { data, isLoading, error } = useGetRoomsQuery({
    minPrice: debouncedMinPrice,
    maxPrice: debouncedMaxPrice,
    minCapacity: debouncedMinCapacity,
    maxCapacity: debouncedMaxCapacity,
    sort,
    page: currentPage,
    searchTerm: debouncedSearchTerm,
  });

  if (isLoading) return; //<Loading />;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (data?.pagination?.totalPage ?? 0)) {
      setSearchParams((prev) => {
        prev.set("page", String(newPage));
        return prev;
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set("searchTerm", e.target.value);
      prev.set("page", "1");

      return prev;
    });
    setFilterValues((prev) => ({
      ...prev,
      page: 1,
      searchTerm: e.target.value,
    }));
  };

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set("min_price", e.target.value);
      prev.set("page", "1");

      return prev;
    });
    setFilterValues((prev) => ({ ...prev, page: 1, minPrice: e.target.value }));
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set("max_price", e.target.value);
      prev.set("page", "1");
      return prev;
    });
    setFilterValues((prev) => ({ ...prev, page: 1, maxPrice: e.target.value }));
  };

  const handleMinCapacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set("min_capacity", e.target.value);
      prev.set("page", "1");

      return prev;
    });
    setFilterValues((prev) => ({
      ...prev,
      page: 1,
      minCapacity: e.target.value,
    }));
  };

  const handleMaxCapacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set("max_capacity", e.target.value);
      prev.set("page", "1");
      return prev;
    });
    setFilterValues((prev) => ({
      ...prev,
      page: 1,
      maxCapacity: e.target.value,
    }));
  };

  const handleSortBy = (value: string) => {
    setSearchParams((prev) => {
      prev.set("sort_by", value);
      return prev;
    });
    setFilterValues((prev) => ({ ...prev, sort: value }));
  };

  const clearFilters = () => {
    setSearchParams({
      page: "1",
      searchTerm: "",
      min_price: "",
      max_price: "",
      min_capacity: "",
      max_capacity: "",
      sort_by: "",
    });
    setFilterValues({
      searchTerm: "",
      minPrice: "",
      maxPrice: "",
      minCapacity: "",
      maxCapacity: "",
      sort: "",
    });
  };

  const displayRooms = () => {
    if (!data || !data.data.length || error) {
      return <div className="text-xl font-semibold p-4">No Room Found!</div>;
    }

    return data.data.map((room) => <RoomCard key={room._id} room={room} />);
  };

  const displayPagination = () => {
    if (!data || !data.data.length || error) {
      return;
    }

    return (
      <RoomPagination
        pagination={data.pagination}
        handlePageChange={handlePageChange}
      />
    );
  };

  return (
    <div className="px-4 py-8 relative">
      <div className="mb-5">
        <h1 className="text-3xl font-bold mb-2">Meeting Rooms</h1>
        <Separator />
      </div>

      <div className="flex flex-col md:flex-row space-x-6">
        <div className="w-full md:w-1/4">
          <div className="p-4 bg-gray-50 rounded-lg shadow-md mb-6 md:mb-0 sticky top-8 left-0">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div className="mb-6">
              <Input
                onChange={handleSearch}
                type="text"
                value={filterValues.searchTerm}
                placeholder="Search by room name"
              />
            </div>

            <div className="mb-6">
              <span className="block mb-2 font-medium">Price Range:</span>
              <div className="flex items-center">
                <Input
                  type="number"
                  onChange={handleMinPrice}
                  value={filterValues.minPrice}
                  min={1}
                  placeholder="Min"
                  className="w-1/2 mr-2"
                />
                <Input
                  type="number"
                  onChange={handleMaxPrice}
                  value={filterValues.maxPrice}
                  min={1}
                  placeholder="Max"
                  className="w-1/2"
                />
              </div>
            </div>

            <div className="mb-6">
              <span className="block mb-2 font-medium">Capacity Range:</span>
              <div className="flex items-center">
                <Input
                  type="number"
                  onChange={handleMinCapacity}
                  value={filterValues.minCapacity}
                  min={1}
                  placeholder="Min"
                  className="w-1/2 mr-2"
                />
                <Input
                  type="number"
                  onChange={handleMaxCapacity}
                  value={filterValues.maxCapacity}
                  min={1}
                  placeholder="Max"
                  className="w-1/2"
                />
              </div>
            </div>

            <div className="mb-6">
              <span className="block mb-2 font-medium">Sort by:</span>
              <Select onValueChange={handleSortBy} value={filterValues.sort}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pricePerSlot">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="-pricePerSlot">
                    Price: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={clearFilters}
              variant="destructive"
              className="w-full uppercase"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRooms()}
          </div>
          {displayPagination()}
        </div>
      </div>
    </div>
  );
}
